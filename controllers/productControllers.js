import Product from "../models/Product.js"


// get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const product = await Product.find();
        res.status(200).json({
            message : "All products",
            products : product
        });
    } catch (error) {
        next(error)
    }
}

// get single product
export const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            message : "Single product",
            product : product
        });
    } catch (error) {
        next(error)
    }
}