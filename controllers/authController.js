import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

/**
 * @Desc create new user
 * @Route /api/v1/auth/register
 * @METHOD POST
 * @Access public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required!" });

  // email check
  const emailCheck = await User.findOne({ email: email });
  // verify email
  if (emailCheck)
    return res.status(400).json({ message: "Email is already exist!!" });

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name: name,
    email: email,
    password: hashPass,
  });

  // send a message with new user details
  res.status(201).json({
    user,
    message: "User created successfully",
  });
});

/**
 * @Desc user login
 * @Route /api/v1/auth/login
 * @METHOD POST
 * @Access public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // validate fields
  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // check email
  const loginUser = await User.findOne({ email });

  // validate email
  if (!loginUser) return res.status(404).json({ message: "User not found" });

  // password match
  const checkPassword = await bcrypt.compare(password, loginUser.password);

  // validate password
  if (!checkPassword)
    return res.status(404).json({ message: "Password doesn't match" });

  // create access token
  const accessToken = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    }
  );

  // create refresh token
  const refreshToken = jwt.sign(
    { email: loginUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
  );

  // set access token to cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "strict",
  });

  // send a message with user details
  res.status(200).json({
    accessToken,
    user: loginUser,
    message: "User Logged In",
  });
});

/**
 * @Desc user logout
 * @Route /api/v1/auth/logout
 * @METHOD POST
 * @Access private
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "User logged out" });
});

/**
 * @Desc me controller
 * @Route /api/v1/auth/me
 * @METHOD get
 * @Access private
 */
export const me = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @Desc user password reset
 * @Route /api/v1/auth/login
 * @METHOD PATCH
 * @Access private
 */
export const userPasswordReset = asyncHandler(async (req, res) => {
  const { email, old_password, new_password } = req.body;
  // validate fields
  if (!old_password || !new_password)
    return res.status(400).json({ message: "All fields are required" });

  // check email
  const loginUser = await User.findOne({ email });

  // validate email
  if (!loginUser) return res.status(404).json({ message: "User not found" });

  // password match
  const checkPassword = await bcrypt.compare(old_password, loginUser.password);

  // validate password
  if (!checkPassword)
    return res.status(400).json({ message: "Wrong password!" });

  // change password with hash password
  const hashPass = await bcrypt.hash(new_password, 10);

  // update new password
  const data = await User.findByIdAndUpdate(
    loginUser.id,
    {
      password: hashPass,
    },
    { new: true }
  );

  // response
  res.status(200).json({
    message: "Password Changed",
  });
});

/**
 * @Desc user details update
 * @Route /api/v1/auth/login
 * @METHOD patch
 * @Access private
 */
export const userDataUpdate = asyncHandler(async (req, res) => {
  const { name, email, phone, address, birth_date } = req.body;

  // get loggedIn user
  const user = await User.findOne({ email: req.me.email });

  // validate user
  if (!user) return res.status(400).json({ message: "User not found!" });

  // update data
  const data = await User.findByIdAndUpdate(
    user.id,
    {
      name: name ? name : user.name,
      email: email ? email : user.email,
      phone: phone ? phone : user.phone,
      address: address ? address : user.address,
      birth_date: birth_date ? birth_date : user.birth_date,
      photo: req.file ? req.file.filename : user.photo,
    },
    { new: true }
  ).select("-password");

  res.status(200).json({
    user: data,
    message: "Profile Updated",
  });
});
