import asyncHandler from "express-async-handler";
import Category from "../../models/productModels/Category.js";
import createSlug from "../../utils/createSlug.js";
import { cloudDelete, cloudUpload } from "../../utils/cloudinary.js";
import { findPublicId } from "../../helper/helper.js";

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
  const { name, icon, parentCategory } = req.body;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // check for existing category name in database
  const isExistedName = await Category.findOne({ name });

  if (isExistedName)
    return res.status(400).json({ message: "Category name is aleady exist!" });

  // category icon
  let catIcon = null;
  if (icon) {
    catIcon = icon;
  }

  // upload category image to cloud
  let catPhoto = null;
  if (req.file) {
    const categoryImage = await cloudUpload(req.file);
    catPhoto = categoryImage.secure_url;
  }

  const newCategory = await Category.create({
    name: name,
    slug: createSlug(name),
    parentCategory: parentCategory ? parentCategory : null,
    icon: catIcon,
    photo: catPhoto,
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
  const { name, icon, parentCategory } = req.body;
  const { id } = req.params;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // get previous data
  const updateData = await Category.findById(id);

  // validate category
  if (!updateData) {
    return res.status(404).json({ message: "Category not found!" });
  }

  // icon manage
  let catIcon = updateData.icon;
  if (icon) {
    catIcon = icon;
  }

  // upload category image to cloud
  let catPhoto = updateData.photo;

  if (req.file) {
    const categoryImage = await cloudUpload(req.file);
    catPhoto = categoryImage.secure_url;
    await cloudDelete(`category/${findPublicId(updateData.photo)}`);
  }

  // parentCategory manage
  let parentCat = updateData.parentCategory;
  if (parentCategory) {
    parentCat = parentCategory;
  }

  // update Category
  updateData.name = name;
  updateData.slug = createSlug(name);
  updateData.icon = catIcon;
  updateData.photo = catPhoto;

  // manage sub category
  if (parentCategory != updateData.parentCategory) {
    // if parentCategory changed then push sub category
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: updateData._id },
    });

    // if previous parentcategory has this subcategory then remove from database
    await Category.findByIdAndUpdate(updateData.parentCategory, {
      $pull: { subCategory: updateData._id },
    });
  }

  updateData.parentCategory = parentCat;
  updateData.save();
  // response
  res.status(200).json({
    category: updateData,
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

  // delete photo
  if (deletedCategory.photo) {
    await cloudDelete(`category/${findPublicId(deletedCategory.photo)}`);
  }

  // response
  res.status(200).json({
    category: deletedCategory,
    message: "Category Deleted Successful",
  });
});
