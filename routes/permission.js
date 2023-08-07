import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  getSinglePermission,
  updatePermission,
  updatePermissionStatus,
} from "../controllers/permissionController.js";

// router init
const router = express.Router();

// token verify middleware
router.use(tokenVerify);

// routes
router.route("/").get(getAllPermissions).post(createPermission);
router
  .route("/:id")
  .get(getSinglePermission)
  .delete(deletePermission)
  .put(updatePermission)
  .patch(updatePermission);

router.patch("/status/:id", updatePermissionStatus);

// export routes
export default router;
