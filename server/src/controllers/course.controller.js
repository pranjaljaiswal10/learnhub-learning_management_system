import {
  deleteFromCloudinary,
  uploadOnCoudinary,
} from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";

const createCourses = async (req, res) => {
  try {
    const { title, courseLevel } = req.body;
    const newCourse = await Course.create({ title, courseLevel });
    res.status(201).json({
      success: true,
      message: "Course is created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating course",
    });
  }
};

const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.findOne({ isPublished: true }).populate(
      "creator",
      "fullname profilePicUrl"
    );
    if (!courses) {
      res.status(404).json({ sucess: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong while fetching published Courses",
      });
  }
};

const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const course = await Course.find({ creator: userId });
    if (!course) {
      res.status(404).json({ success: false, data: course });
    }
    res.status(200).json({ succcess: true, data: course });
  } catch (error) {
    res.status(500).json({
      success: false,
      json: "Something went wrong while fetching the courses",
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const findCourse = await Course.findById(courseId);
    if (!findCourse) {
      res.status(404).json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, data: findCourse });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the data",
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, courseLevel, coursePrice } = req.body;
    const { thumbnail } = req.file;
    const course = await Course.findById(courseId);
    const courseThumnbnail = course.thumbnail;
    if (courseThumnbnail) {
      const publicId = courseThumnbnail.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }
    const result = await uploadOnCoudinary(thumbnail);
    course.thumbnail = result?.secure_url;
    const updateData = {
      title,
      description,
      courseLevel,
      courseLevel,
      coursePrice,
    };
    const updateCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updateCourse,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: "Something went wrong while edit the courses",
    });
  }
};

export {
  createCourses,
  getPublishedCourses,
  getCreatorCourses,
  getCourseById,
  editCourse,
};
