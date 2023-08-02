import express from "express";
import { createNewCategory, deleteCategory, getAllCategories, getSingleCategory, updateProductCategory } from "../controllers/productCategoryControllers.js";
import { productCategoryMulter } from "../utils/multer.js";

// router init
const router = express.Router();

// routes
router.get("/", getAllCategories);
router.post("/", productCategoryMulter, createNewCategory);
router.get("/:id", getSingleCategory);
router.put("/:id", updateProductCategory);
router.patch("/:id", updateProductCategory);
router.delete("/:id", deleteCategory);



// export router
export default router;