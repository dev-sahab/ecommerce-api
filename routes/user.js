import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/userControllers.js";
import tokenVerify from "../middlewares/tokenVerify.js";

// router init
const router = express.Router();
router.use(tokenVerify)

// routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser);

// export routes
export default router;
