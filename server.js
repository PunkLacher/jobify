// express-async-errors is package that handles all asyn errors so we domn't need try-catch block on every controller. All async errors get handed off to error middleware
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";


//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public
import { dirname } from 'path'
import { fileURLToPath } from "url";
import path from 'path';

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./public')))


//morgan library middleware to log reqs only during dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middleware to automatically parse json req and res
app.use(express.json());
app.use(cookieParser());

//CRUD Routes

//test get route
app.get("/", (req, res) => {
  res.send("Hello World");
});

//dummy route for learning about proxy server
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

//middleware that sets base route for jobRouter, userRouter, authRouter
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

// point all get routes to the index.html entry point for from end
app.get('*', (req, res) => {
  res.sendFile(path).resolve(__dirname,'./public','index.html')
})


//404 route for any and all url routes not defined above
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

//set port
const port = process.env.PORT || 5100;

//connect to db with mongoose, then start listening on port
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
