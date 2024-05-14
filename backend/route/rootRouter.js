import express from "express"
import userRoutes from "./userRoutes.js"
import tasksRoutes from "./tasksRoutes.js"
const routes = express.Router()

routes.use("/user",userRoutes)
routes.use("/tasks",tasksRoutes)
export default routes