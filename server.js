import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

/** Routers */
import user from "./routes/user.js";
import auth from "./routes/auth.js";
import permission from "./routes/permission.js";
import role from "./routes/role.js";
// import product from "./routes/product.js";
// import productCategory from "./routes/productCategory.js";
// import productBrand from "./routes/productBrand.js";
// import productTag from "./routes/productTag.js";
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
app.use(cors({
  origin : "http://localhost:3000",
  credentials : true,
}));

// static folder
app.use(express.static("public"));

// routes
app.use("/api/v1/user", user);
app.use("/api/v1/auth", auth);
app.use("/api/v1/permission", permission);
app.use("/api/v1/role", role);
// app.use("/api/v1/product/category", productCategory);
// app.use("/api/v1/product/brand", productBrand);
// app.use("/api/v1/product/tag", productTag);
// app.use("/api/v1/product", product);

// error Handler
app.use(errorHandler);

// server listen
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
});
