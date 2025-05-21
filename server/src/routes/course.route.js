import { Router } from "express";
import authVerify from "../middlewares/auth.middleware.js";
import {
  createCourses,
  editCourse,
  getCourseById,
  getCreatorCourses,
  getPublishedCourses,
} from "../controllers/course.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import lectureRouter from "./lecture.route.js";

const courseRouter = Router();

courseRouter.post("/", authVerify, createCourses);
courseRouter.get("/",authVerify,getCreatorCourses)
courseRouter.get("/publish",authVerify,getPublishedCourses)
courseRouter.put(
  "/:courseId",
  authVerify,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/:courseId", authVerify, getCourseById);
courseRouter.use("/:courseId/lecture",lectureRouter)

export default courseRouter;
