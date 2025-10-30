import { Router } from "express";
import {
  listingProduct,
  getProductById,
  getAllProducts,
  getSellerProducts,
  updateProduct,
  deleteProduct,
  addReview,
  searchProducts
} from "../Controllers/product.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { verifySeller, verifyBuyer } from "../Middlewares/role.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllProducts);
router.route("/search").get(searchProducts);
router.route("/:productId").get(getProductById);

// Seller routes
router.route("/").post(verifyJwt, verifySeller, upload.fields([{ name: "images", maxCount: 10 }]), listingProduct);
router.route("/:productId").put(verifyJwt, verifySeller, upload.fields([{ name: "images", maxCount: 10 }]), updateProduct);
router.route("/:productId").delete(verifyJwt, verifySeller, deleteProduct);
router.route("/seller/products").get(verifyJwt, verifySeller, getSellerProducts);

// Buyer routes
router.route("/:productId/review").post(verifyJwt, verifyBuyer, addReview);

export default router;
