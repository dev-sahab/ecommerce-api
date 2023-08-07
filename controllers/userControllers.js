import bcrypt from "bcrypt";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import { sendMail } from "../utils/sendMail.js";
import Role from "../models/Role.js";

/**
 * @Desc Get All Users
 * @Route /api/v1/user
 * @METHOD GET
 * @Access private
 */
export const getAllUsers = async (req, res, next) => {
  try {
    // get all user data
    const user = await User.find().select("-password").populate("role");

    // send a message with all user data
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @Desc Get Single User
 * @Route /api/v1/user/:id
 * @METHOD GET
 * @Access private
 */
export const getSingleUser = async (req, res, next) => {
  try {
    // get single user data
    const user = await User.findById(req.params.id);

    // send a message with user data
    res.status(200).json({
      message: "Single User",
      users: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @Desc create new user
 * @Route /api/v1/user
 * @METHOD POST
 * @Access public
 */
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role)
    return res.status(400).json({ message: "All fields are required!" });

  // email check
  const emailCheck = await User.findOne({ email: email });
  // verify email
  if (emailCheck)
    return res.status(400).json({ message: "Email is already exist!!" });

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // find role name
  const roleName = await Role.findOne({ _id: role });

  // create new user
  const user = await User.create({
    name: name,
    email: email,
    password: hashPass,
    role: roleName,
  });

  sendMail({
    to: email,
    sub: "Dashboard Access",
    msg: `Your Dashboard Access. Email : ${email}, Password : ${password}`,
  });

      // Remove password from loginUser object
      const { password: _, ...userWithoutPassword } = user._doc;
  // send a message with new user details
  res.status(201).json({
    user : userWithoutPassword,
    message: "User created successfully",
  });
});
