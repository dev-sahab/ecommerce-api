import Brand from "../models/Brand.js"
import slugify from "../utils/slugify.js";


// get all product brand
export const getAllProductBrand = async (req, res, next) => {
    try {
        const data = await Brand.find();
        res.status(200).json({
            message : "All product's brands get successful",
            brands : data
        });
    } catch (error) {
        next(error)
    }
}

// get single product brand
export const getSingleProductBrand = async (req, res, next) => {
    try {
        const data = await Brand.findById(req.params.id);
        res.status(200).json({
            message : "Single product's brand get successful",
            brand : data
        });
    } catch (error) {
        next(error)
    }
}

// create product brand
export const createNewProductBrand = async (req, res, next) => {
    try {
        const data = await Brand.create({
            name : req.body.name,
            slug : slugify(req.body.name),
            photo : req.file ? req.file.filename : null 
        });
        res.status(201).json({
            message : "New product's brand created successful",
            brand : data
        })
    } catch (error) {
        next(error)
    }
}

// update product brand
export const updateProductBrand = async (req, res, next) => {
    try {
        const data = await Brand.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            slug : slugify(req.body.name)
        }, {new : true});
        res.status(200).json({
            message : "Product's brand updated successful",
            brand : data
        })
    } catch (error) {
        next(error)
    }
}

// delete product brand
export const deleteProductBrand = async (req, res, next) => {
    try {
        const data = await Brand.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : "Product's brand deleted successful",
            brand : data
        })
    } catch (error) {
        next(error)
    }
}