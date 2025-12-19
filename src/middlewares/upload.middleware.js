import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "video/mp4",
    "video/webm",
  ];

  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Unsupported file type"), false);
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});
