import asyncHandler from "express-async-handler";
import { cloudUpload } from "../../utils/cloudinary.js";
import createSlug from "../../utils/createSlug.js";
import Product from "../../models/productModels/Product.js";

/**
 * @Desc Get All Products
 * @Route /api/v1/product
 * @METHOD GET
 * @Access public
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  // get all product data
  const brands = await Product.find();

  if (brands.length > 0) return res.status(200).json(brands);

  // send a message if product not found
  res.status(404).json({ message: "Product not found!" });
});

/**
 * @Desc Get Single Product
 * @Route /api/v1/product/:id
 * @METHOD GET
 * @Access public
 */

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // get single product data
  const product = await Product.findById(id);

  // send a message if product not found
  if (!product) return res.status(404).json({ message: "Product not found!" });

  res.status(200).json(product);
});

/**
 * @Desc Create New Product
 * @Route /api/v1/product
 * @METHOD POST
 * @Access private
 */

export const createNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    categories,
    tags,
    brand,
    regular_price,
    sale_price,
    stock,
    short_desc,
    long_desc,
  } = req.body;

  if (!name || !regular_price || !long_desc) {
    return res.status(400).json({ message: "Fields are required" });
  }

  // isExistName
  const isExistName = await Product.findOne({ name });
  if (isExistName)
    return res.status(400).json({ message: "Product name is already exist!" });

  // upload product photo to cloud
  const productPhoto = await cloudUpload(req);

  // save to database
  const newProduct = await Product.create({
    name,
    slug: createSlug(name),
    categories: categories ? categories : null,
    tags: tags ? tags : null,
    brand: brand ? brand : null,
    regular_price,
    sale_price: sale_price ? sale_price : null,
    short_desc: short_desc ? short_desc : null,
    long_desc,
    stock: stock ? stock : null,
    photo: productPhoto ? productPhoto.secure_url : null,
    gallery: null,
  });

  // send response
  res.status(201).json({
    product: newProduct,
    message: "Product Created Successful",
  });
});

/**
 * @Desc Update Product
 * @Route /api/v1/product/:id
 * @METHOD PUT/PATCH
 * @Access private
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    categories,
    tags,
    brand,
    regular_price,
    sale_price,
    stock,
    short_desc,
    long_desc,
  } = req.body;

  // find data
  const productData = await Product.findById(req.params.id);

  console.log(req.file);
  console.log(req.body);
  // upload product photo to cloud
  const productPhoto = await cloudUpload(req);

  // save to database
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: name ? name : productData.name,
      slug: name ? createSlug(name) : productData.slug,
      categories: categories ? categories : productData.categories,
      tags: tags ? tags : productData.tags,
      brand: brand ? brand : productData.brand,
      regular_price: regular_price ? regular_price : productData.regular_price,
      sale_price: sale_price ? sale_price : productData.sale_price,
      short_desc: short_desc ? short_desc : productData.short_desc,
      long_desc: long_desc ? long_desc : productData.long_desc,
      stock: stock ? stock : productData.stock,
      photo: productPhoto ? productPhoto.secure_url : productData.photo,
      gallery: null,
    },
    { new: true }
  );

  // send response
  res.status(200).json({
    product: updatedProduct,
    message: "Product Updated Successful",
  });
});

/**
 * @Desc Delete Product
 * @Route /api/v1/product/:id
 * @METHOD DELETE
 * @Access private
 */

export const deleteProduct = asyncHandler(async (req, res) => {
  // find data
  const productData = await Product.findById(req.params.id);
  if (!productData)
    return res.status(404).json({ message: "Product not found" });

  const deletedData = await Product.findByIdAndDelete(req.params.id);
  // send response
  res.status(200).json({
    product: deletedData,
    message: "Product Deleted Successful",
  });
});
