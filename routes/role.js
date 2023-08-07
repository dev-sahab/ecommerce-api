import express from "express";

import tokenVerify from "../middlewares/tokenVerify.js";
import { createRole, deleteRole, getAllRole, getSingleRole, updateRole, updateRoleStatus } from "../controllers/roleController.js";


// router init
const router = express.Router();

// token verify middleware
router.use(tokenVerify);

// routes
router.route("/").get(getAllRole).post(createRole);
router
  .route("/:id")
  .get(getSingleRole)
  .delete(deleteRole)
  .put(updateRole)
  .patch(updateRole);

router.route("/status/:id").put(updateRoleStatus).patch(updateRoleStatus)

// export routes
export default router;
