import {Router} from "express";
import { getUserProfile, loginUser, logOutUser, registerUser } from "../controllers/auth.controller";

const userRouter=Router()

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/logout",logOutUser)
userRouter.get("/profile",getUserProfile)


export default userRouter;