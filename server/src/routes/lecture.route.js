import { Router } from "express";
import authVerify from "../middlewares/auth.middleware.js";
import {
  createLecture,
  editLecture,
  getLecture,
  getLectureById,
  removeLecture,
} from "../controllers/lecture.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const lectureRouter = Router();

lectureRouter.post("/", upload.array(), authVerify, createLecture);
lectureRouter.get("/", authVerify, getLecture);
lectureRouter.put("/:lecureId", authVerify, editLecture);
lectureRouter.get("/:lecureId", authVerify, getLectureById);
lectureRouter.delete("/:lectureId", authVerify, removeLecture);

export default lectureRouter;
