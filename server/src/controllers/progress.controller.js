import { Progress } from "../models/courseProgress.model.js";

const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const progress = await Progress.findById(courseId).populate("courseId");
    if (!progress) {
      res.status(404).json({
        success: false,
        message: "No progresss found for this course",
      });
    }
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching progress",
    });
  }
};

const updateLectureProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const progress = await Progress.findOne({ courseId, userId });
    if (!progress) {
      const newProgress = await Progress.create({
        courseId,
        userId,
        isCompleted: false,
        lectureProgress: [],
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const courseProgress = await Progress.findOne({ courseId, userId });
    if (!courseProgress) {
      res.status(404).json({ success: false, message: "No Progress Found" });
    }
    courseProgress.lectureProgress.map((course) => (course.viewed = true));
    await courseProgress.save();
    res
      .status(200)
      .json({ success: true, message: "Course marked as completed." });
  } catch (error) {
    console.log(error);
  }
};

const markAsIncompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const courseProgress = await Progress.findOne({ courseId, userId });
    if (!courseProgress) {
      res.status(404).json({ success: false, message: "No Progress Found" });
    }
    courseProgress.lectureProgress.map((course) => (course.viewed = false));
    await courseProgress.save();
    res
      .status(200)
      .json({ success: false, message: "Course marked as incomple" });
  } catch (error) {
    console.log(error);
  }
};

export {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsIncompleted,
};
