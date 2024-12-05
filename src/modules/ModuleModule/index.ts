import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { createModuleRoute , getModuleRoute } from "./functions/module";


const moduleRoutes = Router()


moduleRoutes.post("/" , verifyToken , createModuleRoute)
moduleRoutes.get("/" , verifyToken , getModuleRoute)


export default moduleRoutes
