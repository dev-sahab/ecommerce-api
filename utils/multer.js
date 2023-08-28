import multer from "multer";

/**
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname == "product-category") {
      cb(null, "public/products/categories");
    }
    if (file.fieldname == "product-brand") {
      cb(null, "public/products/brands");
    }
    if (
      file.fieldname == "product-photo" ||
      file.fieldname == "product-gallery"
    ) {
      cb(null, "public/products");
    }
    if (file.fieldname == "user-profile") {
      cb(null, "public/user");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
 */

// create storage
const storage = multer.memoryStorage();

// product brand logo multer middleware
export const productBrandMulter = multer({ storage }).single("brand-logo");

// user profile photo multer middleware
export const userProfileMulter = multer({ storage }).single("user-profile");

// product category multer middleware
export const productCategoryMulter = multer({ storage }).single(
  "product-category"
);

// product photos multer middleware
export const productMulter = multer({ storage }).fields([
  { name: "product-photo", maxCount: 1 },
  { name: "product-gallery", maxCount: 10 },
]);