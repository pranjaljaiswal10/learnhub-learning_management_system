import { Router } from "express";
import authVerify from "../middlewares/auth.middleware.js";
import {
  getCourseProgress,
  markAsCompleted,
  markAsIncompleted,
  updateLectureProgress,
} from "../controllers/progress.controller.js";

const progressRouter = Router();

progressRouter.get("/:courseId", authVerify, getCourseProgress);
progressRouter.put("/:courseId", authVerify, updateLectureProgress);
progressRouter.patch("/:courseId", authVerify, markAsCompleted);
progressRouter.patch("/:courseId", authVerify, markAsIncompleted);

export default progressRouter;
