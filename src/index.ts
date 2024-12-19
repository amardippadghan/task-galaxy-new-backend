import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//db imports
import { connect } from "./core/db";



//routes imports 
import hellooRoutes from "./modules/HelloModule";
import authRoutes from "./modules/AuthModule";
import userRoutes from "./modules/UserModule";
import projectRoutes from "./modules/ProjectModule";
import deparmentRoutes from "./modules/DeparmentModule";
import moduleRoutes from "./modules/ModuleModule";
import taskRoutes from "./modules/TaskModule.ts";



// Load environment variables
dotenv.config();

const app = express();


// Middleware
app.use(express.json({ limit: "20mb" }));
app.use(cors());



//hello routes 
app.use("/api/hello", hellooRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/deparment", deparmentRoutes);
app.use("/api/module" , moduleRoutes)
app.use("/api/task" , taskRoutes)



app.listen(process.env.PORT, async () => {
    try {
      await connect();
      console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });
 




