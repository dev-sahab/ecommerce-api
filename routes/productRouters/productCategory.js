import express from "express";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategory,
  getSingleProductCategory,
  updateProductCategory,
} from "../../controllers/productControllers/productCategoryControllers.js";
import { productCategoryMulter } from "../../utils/multer.js";

// router init
const router = express.Router();

// routes
router
  .route("/")
  .get(getAllProductCategory)
  .post(productCategoryMulter, createProductCategory);
router
  .route("/:id")
  .get(getSingleProductCategory)
  .put(productCategoryMulter, updateProductCategory)
  .patch(productCategoryMulter, updateProductCategory)
  .delete(deleteProductCategory);

// export router
export default router;
