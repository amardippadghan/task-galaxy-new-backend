import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { userProfile } from "./function/user";


const userRoutes = Router();


userRoutes.get("/profile" , verifyToken , userProfile);





export default userRoutes