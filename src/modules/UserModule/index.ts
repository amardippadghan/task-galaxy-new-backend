import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { getUserRoute, userProfile } from "./function/user";


const userRoutes = Router();


userRoutes.get("/profile" , verifyToken , userProfile);
userRoutes.get("/" , verifyToken , getUserRoute)





export default userRoutes