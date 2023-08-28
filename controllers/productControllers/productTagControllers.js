import asyncHandler from "express-async-handler";
import Tag from "../../models/productModels/Tag.js";
import createSlug from "../../utils/createSlug.js";

/**
 * @Desc Get All tags
 * @Route /api/v1/product/tag
 * @METHOD GET
 * @Access public
 */

export const getAllProductTag = asyncHandler(async (req, res) => {
  // get all product data
  const tags = await Tag.find();

  if (tags.length > 0) return res.status(200).json(tags);

  // send a message if product tag not found
  res.status(404).json({ message: "Tag not found!" });
});

/**
 * @Desc Get Single tag
 * @Route /api/v1/product/tag/:id
 * @METHOD GET
 * @Access public
 */

export const getSingleProductTag = asyncHandler(async (req, res) => {
  // get single product tag
  const { id } = req.params;

  const data = await Tag.findById(id);
  // data validation
  if (!data) return res.status(404).json({ message: "tag not found!" });

  // send a response with tag data
  res.status(200).json(data);
});

/**
 * @Desc Create New tag
 * @Route /api/v1/product/tag
 * @METHOD POST
 * @Access private
 */
export const createProductTag = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // check for existing tag name in database
  const isExistedName = await Tag.findOne({ name });

  if (isExistedName)
    return res.status(400).json({ message: "Tag name is aleady exist!" });

  const newTag = await Tag.create({
    name: name,
    slug: createSlug(name),
  });

  res.status(201).json({
    tag: newTag,
    message: "Tag Created Successful",
  });
});

/**
 * @Desc Update tag
 * @Route /api/v1/product/tag/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updateProductTag = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // update tag
  const updatedTag = await Tag.findByIdAndUpdate(
    id,
    {
      name: name,
      slug: createSlug(name),
    },
    { new: true }
  );

  // response
  res.status(200).json({
    tag: updatedTag,
    message: "Tag Updated Successful",
  });
});

/**
 * @Desc Delete tag
 * @Route /api/v1/product/tag/:id
 * @METHOD DELETE
 * @Access private
 */
export const deleteProductTag = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // delete tag
  const deletedTag = await Tag.findByIdAndDelete(id);

  // response
  res.status(200).json({
    tag: deletedTag,
    message: "Tag Deleted Successful",
  });
});
