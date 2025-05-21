import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import connectDB from "./db/index.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import purchaseRouter from "./routes/purchase.route.js";
import progressRouter from "./routes/progress.route.js";


dotenv.config({
  path: "./.env",
});

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",userRouter)
app.use("/api/v1/courses",courseRouter)
app.use("/api/v1/progress",progressRouter)
app.use("/api/v1/payment",purchaseRouter)



connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log("server running on port:", port);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED!", err);
  });
