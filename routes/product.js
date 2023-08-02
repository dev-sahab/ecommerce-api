import express from "express";
import { getAllProducts, getSingleProduct } from "../controllers/productControllers.js";

// router init
const router = express.Router();

// routes
router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);


// export routes
export default router;