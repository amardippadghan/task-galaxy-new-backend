import { Router } from "express";
import { verifyToken } from "../../auth/authorizer";
import { createDepartmentRoute, getDeparmentRoute, updateDeparmentRoute } from "./function/deparment";


const deparmentRoutes = Router()


deparmentRoutes.post("/" , verifyToken , createDepartmentRoute)
deparmentRoutes.get("/" , verifyToken , getDeparmentRoute)
deparmentRoutes.patch("/" , verifyToken , updateDeparmentRoute)





export default deparmentRoutes