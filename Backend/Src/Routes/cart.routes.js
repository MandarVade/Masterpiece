import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  clearCart
} from "../Controllers/cart.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { verifyBuyer } from "../Middlewares/role.middleware.js";

const router = Router();

// All cart routes require buyer authentication
router.use(verifyJwt, verifyBuyer);

router.route("/").get(getCart);
router.route("/").post(addToCart);
router.route("/clear").post(clearCart);
router.route("/:productId").delete(removeFromCart);
router.route("/:productId").put(updateCartQuantity);

export default router;
