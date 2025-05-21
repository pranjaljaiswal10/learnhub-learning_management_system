import {
  deleteVideoFromCloudinary,
  uploadOnCoudinary,
} from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    const lecture = await Lecture.create({ title });
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $push: lecture._id },
      { new: true }
    );
    res.status(201).json({ succcess: true, data: lecture });
  } catch (error) {
    console.log(error);
  }
};

const getLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const allLecture = await Course.findById(courseId).populate("lectureId");
    if (!allLecture) {
      res.status(404).json({
        success: false,
        message: "No Lecture found from this CourseId",
      });
    }
    res.status(200).json({ success: true, data: allLecture });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something wen't wrong while fetch all Lecture",
    });
  }
};

const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!findLecture) {
      res.status(404).json({ succcess: false, message: "Lecture not found" });
    }
    res.status(200).json({ succcess: true, data: lecture });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succcess: false,
      message: "Something went wrong while fetching lecture",
    });
  }
};

const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree } = req.body;
    const lecture = await Lecture.findById(lectureId);
    const content = req.file;
    const result = await uploadOnCoudinary(content);
    lecture.videoUrl = result.secure_url;
    lecture.publicId = result.public_id;
    lecture.isPreviewFree = "true" === isPreviewFree;
    const savedLecture = await lecture.save();
    res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      data: savedLecture,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succcess: false,
      message: "Something went wrong while updating lecture",
    });
  }
};

const removeLecture = async (req, res) => {
  try {
    const lectureId = req.params;
    const lecture = await Lecture.findById(lectureId);
    await deleteVideoFromCloudinary(lecture.publicId);
    await lecture.deleteOne();
    if (!lecture) {
      res.status(404).json({ succcess: false, json: "Lecture not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Lecture deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucees: false,
      message: "Something went wrong while removing the lecture",
    });
  }
};

export {
  createLecture,
  editLecture,
  getLecture,
  getLectureById,
  removeLecture,
};
