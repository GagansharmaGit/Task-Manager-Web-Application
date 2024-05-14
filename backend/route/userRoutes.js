import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from '../models/User.js';
const router = express.Router();
export const JWT_SECRET = "ThisISJWT_____SEC__RET"
router.post("/register", async (req, res) => {
    const {username,email,password} = req.body;
    try {
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail) {
            return res.status(400).json({
                message: "User with this email already exists",
                email
            });
        }

        if (existingUsername) {
            return res.status(400).json({
                message: "User with this username already exists",
                username
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });


        await newUser.save();
        const payload ={
            userId: newUser._id,
            email: newUser.email
        }
        const token = jwt.sign(payload, JWT_SECRET);



        res.status(200).json({
            message: "User registered successfully",
            email,
            username,
            token
        });
    } catch (error) {
        if (error.code === 11000) {

            return res.status(400).json({
                message: "Duplicate key error. This username or email is already taken."
            });
        } else {

            console.error("Error registering user:", error);
            return res.status(500).json({
                message: "An error occurred while registering the user. Please try again later."
            });
        }
    }
});

router.post("/login",async (req,res)=>{
    const {email , password} = req.body;
    try {
        
        const response = await User.findOne({
            email
        })
        if(!response){
            res.status(400).json({
                message : "email is already"
            })
        }

        const comparePassword = await bcrypt.compare(password,response.password)
        if(!comparePassword){
            res.status(400).json({
                message : "wrong password"
            })
        }
        const payload = {
            userId: response._id,
            email: response.email
        };
        const newToken = jwt.sign(payload, JWT_SECRET);

        res.status(200).json({
            message : "Login successfully",
            token : newToken
        })
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ 
            message: "An error occurred during login. Please try again later." 
        });
    }
})

export default router;
