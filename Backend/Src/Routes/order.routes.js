import { Router } from "express";
import {
  createOrder,
  getOrderHistory,
  getOrderDetails,
  updateOrderStatus,
  getSellerOrders
} from "../Controllers/order.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { verifyBuyer, verifySeller } from "../Middlewares/role.middleware.js";

const router = Router();

// Buyer routes
router.route("/").post(verifyJwt, verifyBuyer, createOrder);
router.route("/history").get(verifyJwt, verifyBuyer, getOrderHistory);
router.route("/:orderId").get(verifyJwt, verifyBuyer, getOrderDetails);

// Seller routes
router.route("/seller/orders").get(verifyJwt, verifySeller, getSellerOrders);
router.route("/:orderId/status").put(verifyJwt, verifySeller, updateOrderStatus);

export default router;
