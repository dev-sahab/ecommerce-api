import Category from "../models/Category.js"
import slugify from "../utils/slugify.js";

// get all category data
export const getAllCategories = async (req, res, next) => {
    try {
        const data = await Category.find();
        res.status(200).json({
            message : "All Data Get Successful",
            categories : data
        });
    } catch (error) {
        next(error)
    }
}

// create new category
export const createNewCategory = async (req, res, next) => {
    try {
        const {name} = req.body;
        const data = await Category.create({
            name, slug : slugify(name),
            photo : req.file ? req.file.filename : null
        })
        res.status(201).json({
            message : "New Category Created",
            category : data
        });
    } catch (error) {
        next(error)
    }
}

// get single category
export const getSingleCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await Category.findById(id);
        res.status(200).json({
            message : "Single Data Get Successful",
            category : data
        });
    } catch (error) {
        next(error)
    }
}

// update category
export const updateProductCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name} = req.body;
        const data = await Category.findByIdAndUpdate(id, {
            name, slug : slugify(name)
        }, {new : true})
        res.status(200).json({
            message : "Category Data Updated",
            category : data
        });
    } catch (error) {
        next(error)
    }
}

// delete category
export const deleteCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await Category.findByIdAndDelete(id);
        res.status(200).json({
            message : "Category Data Deleted",
            category : data
        });
    } catch (error) {
        next(error)
    }
}