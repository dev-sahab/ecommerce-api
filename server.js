import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

/** Routers */
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import permissionRouter from "./routes/permission.js";
import roleRouter from "./routes/role.js";
import productBrandRouter from "./routes/productRouters/productBrand.js";
import productTagRouter from "./routes/productRouters/productTag.js";
import productCategoryRouter from "./routes/productRouters/productCategory.js";
import productRouter from "./routes/productRouters/product.js";
/** /Routers */

// express init
const app = express();

// environment variable
dotenv.config();
const PORT = process.env.PORT || 4000;

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// static folder
app.use(express.static("public"));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/permission", permissionRouter);
app.use("/api/v1/role", roleRouter);
app.use("/api/v1/product/brand", productBrandRouter);
app.use("/api/v1/product/tag", productTagRouter);
app.use("/api/v1/product/category", productCategoryRouter);
app.use("/api/v1/product", productRouter);

// error Handler
app.use(errorHandler);

// server listen
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
