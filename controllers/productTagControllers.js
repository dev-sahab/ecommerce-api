import Tag from "../models/Tag.js";
import slugify from "../utils/slugify.js";


// get all product tags
export const getAllProductTags = async (req, res, next) => {
    try {
        const tags = await Tag.find();
        res.status(200).json({
            message : "All tags get successful",
            tags : tags
        });
    } catch (error) {
        next(error);
    }
}

// create a new tag
export const createProductTag = async (req, res, next) => {
    try {
        const tag = await Tag.create({
            name : req.body.name,
            slug : slugify(req.body.name)
        });
        res.status(201).json({
            message : "Tag created successfully",
            tag : tag
        });

    } catch (error) {
        next(error);
    }
}

// get single product tag
export const getSingleProductTag = async (req, res, next) => {
    try {
        const tag = await Tag.findById(req.params.id);
        res.status(200).json({
            message : "Tag get successful",
            tag : tag
        });
    } catch (error) {
        next(error);
    }
}

// delete a tag
export const deleteProductTag = async (req, res, next) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message : "Tag deleted successfully",
            tag : tag
        });
    } catch (error) {
        next(error);
    }
}

// update a tag
export const updateProductTag = async (req, res, next) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, {
            name : req.body.name,
            slug : slugify(req.body.name)
        }, {new : true});
        res.status(200).json({
            message : "Tag updated successfully",
            tag : tag
        });
    } catch (error) {
        next(error);
    }
}
