import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from './routes/productRoute.js'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;
connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/user", userRouter);
app.use('/api/product',productRouter)

app.get("/", (req, res) => {
  res.send("hello ji");
});

app.listen(PORT, () => {
  console.log(`port connected on ${PORT}`);
});
