import sharp from "sharp";
import path from "path";
import fs from "fs";
import multer from "multer";
import { nanoid } from "nanoid";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "public/");
  },
  filename: function (_req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};
const fileFilter = (req: Request, file, done) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    done(null, true);
  } else {
    done(new Error("file type not supported"), false);
  }
};
const UPLOAD_IMG_PATH = path.resolve(__dirname, "../../../public/uploads");
const UPLOAD_THUMBNAIL_PATH = path.resolve(
  __dirname,
  "../../../public/thumbnails"
);
const upload = multer({
  storage,
  limits,
  fileFilter,
}).single("file");

const saveToFolder = (req: Request, res: Response, folder: string) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    try {
      const { file } = req;
      if (!file) {
        return res
          .status(400)
          .json({ success: false, message: "file not supplied" });
      }
      const newName = Date.now() + nanoid(5) + path.extname(file.originalname);
      const newFilePath = path.join(folder, newName);
      // save newFilePath in your db as image path
      await sharp(file.path).resize().jpeg({ quality: 50 }).toFile(newFilePath);
      fs.unlinkSync(file.path);
      return res.status(200).json({
        success: true,
        message: "image uploaded",
        filename: newName,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
};
const uploadImg = (req: Request, res: Response) => {
  saveToFolder(req, res, UPLOAD_IMG_PATH);
};
const uploadThumbnail = (req: Request, res: Response) => {
  saveToFolder(req, res, UPLOAD_THUMBNAIL_PATH);
};

const uploadController = {
  uploadImg,
  uploadThumbnail,
};

export default uploadController;
