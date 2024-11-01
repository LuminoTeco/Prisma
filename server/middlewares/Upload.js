const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "Public", "Images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); 
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `user_${Date.now()}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedType = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido"), false);
    }
  },
});

const uploadSingleImage = upload.single("foto_perfil");

module.exports = uploadSingleImage;
