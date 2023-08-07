import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// verify token
const tokenVerify = (req, res, next) => {
  // get cookie token
  const accessToken = req.cookies.accessToken;

  // validate auth
  if (!accessToken) return res.status(400).json({ message: "Unauthorized" });

  // verify token
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      // if found err
      if (err) return res.status(400).json({ message: "Invalid Token" });

      // get user's data
      const me = await User.findOne({ email: decode.email }).select(
        "-password"
      ).populate("role");

      // asign value to req.me
      req.me = me;

      // get access to next route
      next();
    })
  );
};

// export tokenVerify
export default tokenVerify;
