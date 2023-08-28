import express from "express";
import {
  createProductTag,
  deleteProductTag,
  getAllProductTag,
  getSingleProductTag,
  updateProductTag,
} from "../../controllers/productControllers/productTagControllers.js";

// router init
const router = express.Router();

// routes
router.route("/").get(getAllProductTag).post(createProductTag);
router
  .route("/:id")
  .get(getSingleProductTag)
  .put(updateProductTag)
  .patch(updateProductTag)
  .delete(deleteProductTag);

// export routes
export default router;
