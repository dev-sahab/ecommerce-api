import multer from "multer";

// create storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.fieldname + "_" + file.originalname);
  },
});

// product brand logo multer middleware
export const productBrandMulter = multer({ storage }).single("brand-logo");

// user profile photo multer middleware
export const userProfileMulter = multer({ storage }).single("user-profile");

// product category multer middleware
export const productCategoryMulter = multer({ storage }).single(
  "product-category"
);

// product photos multer middleware
export const productPhotoMulter = multer({ storage }).array("product-photo");
