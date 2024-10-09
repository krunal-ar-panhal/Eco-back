import express from "express";
import {
  addProduct,
  listProducts,
  singleProduct,
  removeProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.post(
  "/add",adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.delete("/remove/:id", adminAuth ,removeProduct);
router.get("/single", singleProduct);
router.get("/list", listProducts);

export default router;
