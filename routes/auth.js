import express from "express";
import {
  loginUser,
  registerUser,
  logout,
  me,
  userPasswordReset,
  userDataUpdate,
} from "../controllers/authController.js";
import tokenVerify from "../middlewares/tokenVerify.js";
import { userProfileMulter } from "../utils/multer.js";

// router init
const router = express.Router();

// routes
router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);
router.get("/me", tokenVerify, me);
router.patch("/reset-password", tokenVerify, userPasswordReset);
router.patch("/profile-update", tokenVerify, userProfileMulter, userDataUpdate);

// export routes
export default router;
