import asyncHandler from "express-async-handler";
import Brand from "../../models/productModels/Brand.js";
import createSlug from "../../utils/createSlug.js";
import { cloudUpload } from "../../utils/cloudinary.js";

/**
 * @Desc Get All Brands
 * @Route /api/v1/product/brand
 * @METHOD GET
 * @Access public
 */

export const getAllProductBrand = asyncHandler(async (req, res) => {
  // get all product data
  const brands = await Brand.find();

  if (brands.length > 0) return res.status(200).json(brands);

  // send a message if product not found
  res.status(404).json({ message: "Brands not found!" });
});

/**
 * @Desc Get Single Brands
 * @Route /api/v1/product/brand/:id
 * @METHOD GET
 * @Access public
 */

export const getSingleProductBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // get single product brand
  const data = await Brand.findById(id);
  // data validation
  if (!data) return res.status(404).json({ message: "Brand not found!" });

  // send a response with brand data
  res.status(200).json(data);
});

/**
 * @Desc Create New Brand
 * @Route /api/v1/product/brand
 * @METHOD Post
 * @Access private
 */
export const createProductBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // check for existing brand name in database
  const isExistedName = await Brand.findOne({ name });

  if (isExistedName)
    return res.status(400).json({ message: "Brand name is aleady exist!" });

  const logo = await cloudUpload(req);

  const newBrand = await Brand.create({
    name: name,
    slug: createSlug(name),
    logo: logo ? logo?.secure_url : null,
  });

  res.status(201).json({
    brand: newBrand,
    message: "Brand Created Successful",
  });
});

/**
 * @Desc Update Brand
 * @Route /api/v1/product/brand/:id
 * @METHOD PUT/PATCH
 * @Access private
 */
export const updateProductBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  // get previouse data
  const prevData = await Brand.findById(id);

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // upload logo to cloudinary
  const logo = await cloudUpload(req);

  // update brand
  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    {
      name: name ? name : prevData.name,
      slug: name ? createSlug(name) : prevData.slug,
      logo: logo ? logo.secure_url : prevData.logo,
    },
    { new: true }
  );

  // response
  res.status(200).json({
    brand: updatedBrand,
    message: "Brand Updated Successful",
  });
});

/**
 * @Desc Delete Brand
 * @Route /api/v1/product/brand/:id
 * @METHOD DELETE
 * @Access private
 */
export const deleteProductBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // delete brand
  const deletedBrand = await Brand.findByIdAndDelete(id);

  // response
  res.status(200).json({
    brand: deletedBrand,
    message: "Brand Deleted Successful",
  });
});
