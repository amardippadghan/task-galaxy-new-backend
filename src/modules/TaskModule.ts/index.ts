import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { CreateTaskRoute, updateTaskRoute , getTaskRoute } from "./function/task";


const taskRoutes = Router()


taskRoutes.post("/" , verifyToken , CreateTaskRoute)
taskRoutes.get("/" , verifyToken , getTaskRoute)
taskRoutes.patch("/" , verifyToken , updateTaskRoute)


export default taskRoutes