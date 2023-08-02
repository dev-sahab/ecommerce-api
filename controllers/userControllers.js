import bcrypt from "bcrypt"
import User from "../models/User.js";

/**
 * @Desc Get All Users
 * @Route /api/v1/user
 * @METHOD GET
 * @Access private
 */
export const getAllUsers = async (req, res, next) => {
  try {
    // get all user data
    const user = await User.find();

    // send a message with all user data
    res.status(200).json({
      message: "All Users",
      users: user,
    });
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
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // hash password 
    const hashPass = await bcrypt.hash(password, 10);

    // create new user
    const user = await User.create({
      name: name,
      email: email,
      password: hashPass
    });

    // send a message with new user details
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
