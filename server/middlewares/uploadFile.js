const cloudinary = require("cloudinary").v2;
const Multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports.handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};

const storage = new Multer.memoryStorage();
module.exports.upload = Multer({
  storage,
});
