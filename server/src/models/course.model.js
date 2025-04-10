import mongoose, { mongo } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
    },
    coursePrice: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    enrolledStudents: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },lecture:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Lecture"
    }],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
