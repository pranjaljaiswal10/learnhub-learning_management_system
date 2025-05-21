import { Router } from "express";
import {
  getUserProfile,
  loginUser,
  logOutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authVerify from "../middlewares/auth.middleware.js";
import { userLoginValidator } from "../middlewares/validate.middleware.js";
import { validate } from "../utils/validator.js";


const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userLoginValidator(), validate, loginUser);
userRouter.post("/logout", authVerify, logOutUser);
userRouter.get("/profile", authVerify, getUserProfile);
userRouter.post(
  "/profile",
  authVerify,
  upload.single("thumbnail"),
  updateUserProfile
);

export default userRouter;
