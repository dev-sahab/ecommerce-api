import asyncHandler from "express-async-handler";
import Brand from "../../models/productModels/Brand.js";
import createSlug from "../../utils/createSlug.js";
import { cloudDelete, cloudUpload } from "../../utils/cloudinary.js";
import { findPublicId } from "../../helper/helper.js";

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

  // logo value
  let uploadedLogo = null;

  if (req.file) {
    const logo = await cloudUpload(req.file);
    uploadedLogo = logo.secure_url;
  }

  // create brand data
  const newBrand = await Brand.create({
    name: name,
    slug: createSlug(name),
    logo: uploadedLogo,
  });

  // response
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
  const brandUpdate = await Brand.findById(id);

  // form validation
  if (!name)
    return res.status(400).json({ message: "Name filed is required!" });

  // brand logo
  let updatedLogo = brandUpdate.logo;

  if (req.file) {
    // upload logo to cloudinary
    const logo = await cloudUpload(req.file);
    await cloudDelete(`brand/${findPublicId(brandUpdate.logo)}`);
    updatedLogo = logo.secure_url;
  }

  // update brand
  brandUpdate.name = name;
  brandUpdate.slug = createSlug(name);
  brandUpdate.logo = updatedLogo;
  brandUpdate.save();

  // response
  res.status(200).json({
    brand: brandUpdate,
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

  // delete brand logo
  if (deletedBrand.logo) {
    await cloudDelete(`brand/${findPublicId(deletedBrand.logo)}`);
  }

  // response
  res.status(200).json({
    brand: deletedBrand,
    message: "Brand Deleted Successful",
  });
});
