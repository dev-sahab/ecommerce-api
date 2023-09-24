import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../../controllers/productControllers/productControllers.js";
import { productPhotoMulter } from "../../utils/multer.js";

// router init
const router = express.Router();

// routes
router.route("/").get(getAllProduct).post(productPhotoMulter, createNewProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(productPhotoMulter, updateProduct)
  .patch(productPhotoMulter, updateProduct)
  .delete(deleteProduct);

// export routes
export default router;
