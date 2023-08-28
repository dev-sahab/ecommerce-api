import express from "express";
import {
  createProductBrand,
  deleteProductBrand,
  getAllProductBrand,
  getSingleProductBrand,
  updateProductBrand,
} from "../../controllers/productControllers/productBrandControllers.js";
import { productBrandMulter } from "../../utils/multer.js";

// router init
const router = express.Router();

// routes
router
  .route("/")
  .get(getAllProductBrand)
  .post(productBrandMulter, createProductBrand);
router
  .route("/:id")
  .get(getSingleProductBrand)
  .put(productBrandMulter, updateProductBrand)
  .patch(productBrandMulter, updateProductBrand)
  .delete(deleteProductBrand);

// export routes
export default router;
