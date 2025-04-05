import bcrypt from "bcrypt";
import { User } from "../models/user.model";

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if ([fullname, email, password].some((field) => field.trim() === "")) {
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
    res
      .status(500)
      .json({
        success: false,
        message: "User registration failed,please try again.",
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
    const isPasswordValid=await user.validatePassword(password)
    if(!isPasswordValid){
        res.status(401).json({message:"Invalid Credentials"})
    }
    const option={
        httpOnly:true,
        secure:true,
       expires: new Date(Date.now() + 8 * 3600000),
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Login failed,please try agian later.",
      });
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
  } catch (error) {
    res.status(500).json({success:false})
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId=req.user.id;
    
  } catch (error) {
    res.status(500).json({success:false,})
  }
};

const updateProfile = async (req, res) => {
  try {
  } catch (error) {}
};

export { registerUser, loginUser, logOutUser, getUserProfile, updateProfile };
