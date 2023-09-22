import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { findPublicId } from "../helper/helper.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// upload file to cloudinary
export const cloudUpload = async (file) => {
  const path = file.path;
  let fieldname = file.fieldname;

  // file upload destination
  const destination = () => {
    if (fieldname == "brand-logo") {
      return "wolmart/brand"; // brand logo
    } else if (fieldname == "product-category") {
      return "wolmart/category"; // product category
    } else if (fieldname == "user-profile") {
      return "wolmart/user"; // user profile photo
    } else {
      return "wolmart";
    }
  };

  // upload file server to cloud
  const result = await cloudinary.uploader.upload(path, {
    folder: destination(),
  });

  return result;
};

// delete file from cloudinary
export const cloudDelete = async (publicId) => {
  await cloudinary.uploader.destroy(`wolmart/${publicId}`);
};
