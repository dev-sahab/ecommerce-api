import asyncHandler from "express-async-handler";
import Category from "../../models/productModels/Category.js";
import createSlug from "../../utils/createSlug.js";
import { cloudUpload } from "../../utils/cloudinary.js";

/**
 * @Desc Get All category
 * @Route /api/v1/product/category
 * @METHOD GET
 * @Access public
 */

export const getAllProductCategory = asyncHandler(async (req, res) => {
  // get all product data
  const category = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
          populate: {
            path: "subCategory",
          },
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
          populate: {
            path: "parentCategory",
          },
        },
      },
    },
  ]);

  if (category.length > 0) return res.status(200).json(category);

  // send a message if product category not found
  res.status(404).json({ message: "Category not found!" });
});

/**
 * @Desc Get Single category
 * @Route /api/v1/product/category/:id
 * @METHOD GET
 * @Access public
 */

export const getSingleProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get single product category
  const data = await Category.findById(id).populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
          populate: {
            path: "subCategory",
          },
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
          populate: {
            path: "parentCategory",
          },
        },
      },
    },
  ]);

  // data validation
  if (!data) return res.status(404).json({ message: "Category not found!" });

  // send a response with category data
  res.status(200).json(data);
});

/**
 * @Desc Create New Category
 * @Route /api/v1/product/category
 * @METHOD POST
 * @Access private
 */
export const createProductCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // check for existing category name in database
  const isExistedName = await Category.findOne({ name });

  if (isExistedName)
    return res.status(400).json({ message: "Category name is aleady exist!" });

  // upload category image to cloud
  const categoryImage = await cloudUpload(req);

  const newCategory = await Category.create({
    name: name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    photo: categoryImage ? categoryImage.secure_url : null,
  });

  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: newCategory._id },
    });
  }

  res.status(201).json({
    category: newCategory,
    message: "Category Created Successful",
  });
});

/**
 * @Desc Update Category
 * @Route /api/v1/product/category/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updateProductCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;
  const { id } = req.params;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // get previous data
  const prevData = await Category.findById(id);

  // upload category image to cloud
  const categoryImage = await cloudUpload(req);

  // update Category
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name: name ? name : prevData.name,
      slug: name ? createSlug(name) : prevData.slug,
      photo: categoryImage ? categoryImage.secure_url : prevData.photo,
      parentCategory: parentCategory ? parentCategory : prevData.parentCategory,
    },
    { new: true }
  );


  // if parentCategory changed then push sub category
  if (parentCategory != prevData.parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: updatedCategory._id },
    });
  }
  // response
  res.status(200).json({
    category: updatedCategory,
    message: "Category Updated Successful",
  });
});

/**
 * @Desc Delete Category
 * @Route /api/v1/product/category/:id
 * @METHOD DELETE
 * @Access private
 */
export const deleteProductCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // delete category
  const deletedCategory = await Category.findByIdAndDelete(id);

  // response
  res.status(200).json({
    category: deletedCategory,
    message: "Category Deleted Successful",
  });
});
