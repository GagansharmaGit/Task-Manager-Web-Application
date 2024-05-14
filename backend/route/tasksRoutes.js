import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import  User, { Tasks }  from "../models/User.js";
import  authMiddleware  from "../middleware.js";

const router = express.Router();

router.post("/add-task", authMiddleware, async (req, res) => {

    const { content } = req.body;
    const userId = req.userId;

    try {
        const newTask = new Tasks({
            userId,
            content
        });

        // Save the new task to the database
        const savedTask = await newTask.save();

        res.status(200).json({
            message: "Task added successfully",
            task: savedTask  // Send back the saved task object
        });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({
            message: "An error occurred while adding the task. Please try again later."
        });
    }
});


router.get("/allTasks",authMiddleware,async (req,res)=>{
    
    const userId = req.userId;
    try {
        const tasks = await Tasks.find({
            userId
        })
        res.status(200).json({
            tasks
        })
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({
            message: "An error occurred while fetching tasks. Please try again later."
        });
    }
})

router.delete("/:taskId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
  
    try {
      // Check if the task belongs to the authenticated user before deleting
      const task = await Tasks.deleteOne({ _id: taskId, userId });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  

  
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({
        message: "An error occurred while deleting the task. Please try again later.",
      });
    }
  });



router.put("/:taskId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;
    

    try {

        const task = await Tasks.findOneAndUpdate(
            { _id: taskId, userId },
            req.body, 
            { new: true } 
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            message: "An error occurred while updating the task. Please try again later.",
        });
    }
});



router.get("/:taskId", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.taskId;

    try {

        const task = await Tasks.findOne({ _id: taskId, userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }


        res.status(200).json({ task });
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({
            message: "An error occurred while fetching the task. Please try again later."
        });
    }
});

export default router