import { Router } from "express";
import authVerify from "../middlewares/auth.middleware.js";
import {
  createCourses,
  editCourse,
  getCourseById,
} from "../controllers/course.controller.js";
import {
  createLecture,
  editLecture,
  getCourseLecture,
  getLectureById,
  removeLecture,
} from "../controllers/lecture.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const courseRouter = Router();

courseRouter.post("/", authVerify, createCourses);
courseRouter.put(
  "/:courseId",
  authVerify,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/:courseId", authVerify, getCourseById);
courseRouter.post("/:courseId/lecture",upload.array, authVerify, createLecture);
courseRouter.get("/:courseId/lecture", authVerify, getCourseLecture);
courseRouter.put("/:courseId/lectures/:lecureId", authVerify, editLecture);
courseRouter.get("/:courseId/lecture/:lecureId", authVerify, getLectureById);
courseRouter.delete("/:courseId/lecture/:lectureId", authVerify, removeLecture);

export default courseRouter;
