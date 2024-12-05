import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { getProjectRoute, saveProjectRoute } from "./function/project";


const projectRoutes = Router()


projectRoutes.get("/" , verifyToken , getProjectRoute)
projectRoutes.post("/" , verifyToken , saveProjectRoute)



export default projectRoutes