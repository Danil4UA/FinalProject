import express, { Application, Request, Response } from "express";
import userRouter from "./routes/userRoutes"
import postRouter from "./routes/postRoutes"
import userProfileRouter from "./routes/userProfileRoutes"

import cookieParser from "cookie-parser"
import cors from "cors"
import path from 'path';

import 'dotenv/config';
const app: Application = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin:["http://localhost:5173"]
}))

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5001;

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/profiles", userProfileRouter)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});

