import express from "express";
import { createNewProductBrand, deleteProductBrand, getAllProductBrand, getSingleProductBrand, updateProductBrand } from "../controllers/productBrandControllers.js";
import { productBrandMulter } from "../utils/multer.js";

// router init
const router = express.Router();

// routes
router.get("/", getAllProductBrand);
router.get("/:id", getSingleProductBrand);
router.post("/", productBrandMulter, createNewProductBrand);
router.put("/:id", updateProductBrand);
router.patch("/:id", updateProductBrand);
router.delete("/:id", deleteProductBrand);


// export routes
export default router;