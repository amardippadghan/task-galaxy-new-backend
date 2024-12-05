import { Router } from "express";
import { LoginUser, RegisterUser } from "./function/auth";


const authRoutes = Router()


authRoutes.post("/login" , LoginUser)
authRoutes.post("/register" , RegisterUser)


export default authRoutes