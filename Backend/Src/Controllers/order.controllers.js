import { Order } from "../Models/order.models.js";
import { Cart } from "../Models/cart.models.js";
import { Product } from "../Models/product.models.js";

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const buyerId = req.user._id;

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({ message: "Valid shipping address is required" });
    }

    const cart = await Cart.findOne({ buyer: buyerId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Build order items and validate stock
    const orderItems = [];
    let totalAmount = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.product;

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.title}` });
      }

      orderItems.push({
        product: product._id,
        seller: product.seller,
        quantity: cartItem.quantity,
        price: cartItem.price
      });

      totalAmount += cartItem.price * cartItem.quantity;
    }

    // Create order
    const order = await Order.create({
      buyer: buyerId,
      items: orderItems,
      totalAmount,
      shippingAddress
    });

    // Update product stock
    for (const cartItem of cart.items) {
      await Product.findByIdAndUpdate(
        cartItem.product._id,
        { $inc: { stock: -cartItem.quantity } }
      );
    }

    // Clear cart
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("buyer", "fullname email")
      .populate("items.product", "title")
      .populate("items.seller", "fullname email");

    return res.status(201).json({ success: true, message: "Order created successfully", data: populatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const buyerId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const orders = await Order.find({ buyer: buyerId })
      .populate("items.product", "title images")
      .populate("items.seller", "fullname")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments({ buyer: buyerId });

    return res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findById(orderId)
      .populate("buyer", "fullname email avatar")
      .populate("items.product", "title images price")
      .populate("items.seller", "fullname email avatar");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.buyer._id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized: Cannot view this order" });
    }

    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, notes } = req.body;
    const userId = req.user._id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user is the seller of any item in the order or is admin
    const isSellerInOrder = order.items.some(item => item.seller.toString() === userId.toString());
    if (!isSellerInOrder && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized: Only seller or admin can update order status" });
    }

    // Only allow pending → completed or → cancelled
    if (status && ["completed", "cancelled"].includes(status)) {
      order.status = status;
    }

    if (notes) {
      order.notes = notes;
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("buyer", "fullname email")
      .populate("items.product", "title")
      .populate("items.seller", "fullname email");

    return res.status(200).json({ success: true, message: "Order updated successfully", data: populatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const filter = { "items.seller": sellerId };
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .populate("buyer", "fullname email avatar")
      .populate("items.product", "title images")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
