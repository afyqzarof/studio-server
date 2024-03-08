import express from "express";
import uploadController from "../controllers/upload.controller";

const router = express.Router();

router.route("/").post(uploadController.uploadImg);
router.route("/thumbnail").post(uploadController.uploadThumbnail);

export default router;
