import asyncHandler from "express-async-handler";
import {
  cloudDelete,
  cloudUpload,
  cloudUploads,
} from "../../utils/cloudinary.js";
import createSlug from "../../utils/createSlug.js";
import Product from "../../models/productModels/Product.js";
import { findPublicId } from "../../helper/helper.js";

/**
 * @Desc Get All Products
 * @Route /api/v1/product
 * @METHOD GET
 * @Access public
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  // get all product data
  const products = await Product.find();

  if (products.length > 0) return res.status(200).json(products);

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
    sku,
    productType,
    simpleProduct,
    variableProduct,
    groupProduct,
    externalProduct,
    shortDesc,
    longDesc,
    stock,
  } = req.body;

  if (!name || !productType) {
    return res.status(400).json({ message: "Fields are required" });
  }

  // isExistName
  const isExistName = await Product.findOne({ name });
  if (isExistName)
    return res.status(400).json({ message: "Product name is already exist!" });

  // upload product photo to cloud
  const productPhotos = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const photos = await cloudUploads(req.files[i]);
      productPhotos.push(photos);
    }
  }
  let simpleProductData;
  if (simpleProduct) {
    const simpleProductData = JSON.parse(simpleProduct);
  }

  // save to database
  const newProduct = await Product.create({
    name,
    slug: createSlug(name),
    productType,
    simpleProduct:
      productType == "simple"
        ? { ...simpleProductData, photo: productPhotos }
        : null,
    variableProduct: productType == "variable" ? variableProduct : null,
    groupProduct: productType == "group" ? groupProduct : null,
    externalProduct: productType == "external" ? externalProduct : null,
    categories: categories ? categories : null,
    tags: tags ? tags : null,
    brand: brand ? brand : null,
    shortDesc: shortDesc ? shortDesc : null,
    longDesc: longDesc ? longDesc : null,
    stock: stock ? stock : null,
    sku: sku ? sku : null,
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
    shortDesc,
    longDesc,
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
      shortDesc: shortDesc ? shortDesc : productData.shortDesc,
      longDesc: longDesc ? longDesc : productData.longDesc,
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

  // delete data from database
  const deletedData = await Product.findByIdAndDelete(req.params.id);

  // delete photos
  if (deletedData.productType == "simple") {
    const productPhotos = deletedData.simpleProduct.photo;  
    for (let i = 0; i < productPhotos.length; i++) {
      await cloudDelete(`product/${findPublicId(productPhotos[i])}`);
    }
  }
  // send response
  res.status(200).json({
    product: deletedData,
    message: "Product Deleted Successful",
  });
});
