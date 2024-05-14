import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
   
})

const taskSchema = mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    content :{
        type : String,
        required : true,

    },
    createdAt :{
        type : Date,
        default : Date.now
    }
})
export const Tasks = mongoose.model("Tasks",taskSchema)
 const User = mongoose.model('User', userSchema);
 export default User;


