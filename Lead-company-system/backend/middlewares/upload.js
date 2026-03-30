const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    // 📸 Images
    if (file.mimetype.startsWith("image")) {
      return {
        folder: "cars/images"
      };
    }

    // 🎥 Videos
    if (file.mimetype.startsWith("video")) {
      return {
        folder: "cars/videos",
        resource_type: "video"
      };
    }

    // 📄 Docs (PDF, Excel, Word)
    return {
      folder: "cars/docs",
      resource_type: "auto"
    };
  }
});

// File filter (same as your code 👍)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "video/mp4",
    "video/mkv",
    "video/webm"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only Images, PDFs, and Videos are allowed"), false);
  }
};

// Multer config
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB
  }
});

module.exports = upload;