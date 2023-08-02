import express from "express";
import { createProductTag, deleteProductTag, getAllProductTags, getSingleProductTag, updateProductTag } from "../controllers/productTagControllers.js";

// router init
const router = express.Router();

// routes
router.get("/", getAllProductTags);
router.get("/:id", getSingleProductTag);
router.post("/", createProductTag);
router.put("/:id", updateProductTag);
router.patch("/:id", updateProductTag);
router.delete("/:id", deleteProductTag);


// export routes
export default router;