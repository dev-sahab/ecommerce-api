import multer from "multer";

// create storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname == "product-category"){
            cb(null, "public/products/categories");
        }
        if(file.fieldname == "product-brand"){
            cb(null, "public/products/brands");
        }
        if(file.fieldname == "product-photo" || file.fieldname == "product-gallery"){
            cb(null, "public/products");
        }
        if(file.fieldname == "user-profile"){
            cb(null, "public/user");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() +"_"+ file.originalname);
    }
})

// product category middleware
export const userProfileMulter = multer({
    storage : storage
}).single("user-profile")

// product category middleware
export const productCategoryMulter = multer({
    storage : storage
}).single("product-category")

// product brand middleware
export const productBrandMulter = multer({
    storage : storage
}).single("product-brand")

// product photos middleware
export const productMulter = multer({
    storage : storage
}).fields([
    {
        name: "product-photo",
        maxCount: 1
    }, 
    {
        name: "product-gallery",
        maxCount: 10
    }
])