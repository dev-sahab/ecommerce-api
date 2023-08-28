import dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudUpload = async (req) => {

  if (req.file) {
    // upload file to server
    fs.writeFileSync("./" + req.file.originalname, req.file.buffer);

    // upload file server to cloud
    const data = await cloudinary.uploader.upload(
      "./" + req.file.originalname,
      req.file.buffer
    );

    // delete server file
    fs.unlinkSync("./" + req.file.originalname);

    return data;
  }
};
