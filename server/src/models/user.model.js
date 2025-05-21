import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 15,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: "String",
      enum: ["instructor", "student"],
      default: "student",
    },
    enrolledCourses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    profilePicUrl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) return next();
  user.password = bcrypt.hash(user.password, 10);
});

userSchema.methods.getJwt = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  const isValid = await bcrypt.compare(passwordByUser, user.password);
  return isValid;
};

export const User = mongoose.model("User", userSchema);
