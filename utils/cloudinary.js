import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// upload file to cloudinary
export const cloudUpload = async (path, destination = "wolmart") => {
  // file upload destination
  const folder = () => {
    const filedName = destination;
    if (filedName == "brand-logo") return "wolmart/brand"; // brand logo
    if (filedName == "product-category") return "wolmart/category"; // product category
    if (filedName == "user-profile") return "wolmart/user"; // user profile photo
    return filedName;
  };

  // upload file server to cloud
  const result = await cloudinary.uploader.upload(path, {
    folder: folder(),
  });

  return result;
};

// delete file from cloudinary
export const cloudDelete = async (publicId) => {
  await cloudinary.uploader.destroy(`wolmart/${publicId}`);
};
