import express from "express";
import { productMulter } from "../../utils/multer.js";
import {
  createNewProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../../controllers/productControllers/productControllers.js";

// router init
const router = express.Router();

// routes
router.route("/").get(getAllProduct).post(productMulter, createNewProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .put(productMulter, updateProduct)
  .patch(productMulter, updateProduct)
  .delete(deleteProduct);

// export routes
export default router;
