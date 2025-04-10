import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import {
  deleteFromCloudinary,
  uploadOnCoudinary,
} from "../../utils/cloudinary.js";

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((field) => field?.trim() === "")) {
      res
        .status(401)
        .json({ success: false, message: "All field is required" });
    }
    const findUser = await User.findOne({ $or: [{ email }, { fullname }] });
    if (findUser) {
      res
        .status(409)
        .json({ success: false, message: "User is already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashPassword });
    const token = await user.getJwt();
    const option = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(201)
      .json({ success: true, message: "User registered succesfully" })
      .cookie("token", token, option);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed,please try again.",
      error:error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((field) => field.trim() === "")) {
      res
        .status(401)
        .json({ success: false, message: "All field is required" });
    }
    const user = await User.findOne({ email });
    if (!findUser) {
      res.status(404).json({ success: false, messsage: "Users not found" });
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Credentials" });
    }
    const option = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 8 * 3600000),
    };
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed,please try agian later.",
    });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching profile data",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const file = req.file;
    const user = await User.findById(userId);
    const profilePic = user.profilePicUrl;
    if (profilePic) {
      const publicId = profilePic.split("/").pop().split(".")[0];
      await deleteFromCloudinary(publicId);
    }
    const result = await uploadOnCoudinary(file);
    user.profilePicUrl = result?.secure_url;
    user.fullname = name;
    const savedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went's" });
  }
};

export {
  registerUser,
  loginUser,
  logOutUser,
  getUserProfile,
  updateUserProfile,
};
