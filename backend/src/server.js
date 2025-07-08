import express from "express"
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
dotenv.config();
const app  = express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

connectDB()
if(process.env.NODE_ENV !=="production"){
   const PORT = process.env.PORT || 5001
   app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}...`)
   });
}

export default app;

