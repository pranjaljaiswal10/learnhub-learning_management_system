import mongoose from "mongoose";

const lectureProgressSchema = mongoose.Schema({
  lectureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
    viewed: {
      type: Boolean,
      default: false,
    },
  },
});

const progressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  lectureProgress: [lectureProgressSchema],
});

export const Progress = mongoose.model("Progress", progressSchema);
