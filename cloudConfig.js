const cloudinary =require('cloudinary').v2; // cloudinary version 2
const { CloudinaryStorage} =require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// defining storage from multer-storage-cloudinary documentation

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wanderlust_DEV',
      allowedFormats:['png','jpg','jpeg']
    },
  });

  module.exports={
    cloudinary,
    storage
  }