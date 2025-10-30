import { Cart } from "../Models/cart.models.js";
import { Product } from "../Models/product.models.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const buyerId = req.user._id;

    if (!productId || quantity < 1) {
      return res.status(400).json({ message: "productId and valid quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    let cart = await Cart.findOne({ buyer: buyerId });

    if (!cart) {
      cart = await Cart.create({
        buyer: buyerId,
        items: [{
          product: productId,
          quantity: Number(quantity),
          price: product.price
        }]
      });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        if (existingItem.quantity + quantity > product.stock) {
          return res.status(400).json({ message: "Insufficient stock for this quantity" });
        }
        existingItem.quantity += Number(quantity);
      } else {
        cart.items.push({
          product: productId,
          quantity: Number(quantity),
          price: product.price
        });
      }

      await cart.save();
    }

    const populatedCart = await Cart.findById(cart._id).populate("items.product", "title price images");

    return res.status(200).json({ success: true, message: "Item added to cart", data: populatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const buyerId = req.user._id;

    const cart = await Cart.findOne({ buyer: buyerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("items.product", "title price images");

    return res.status(200).json({ success: true, message: "Item removed from cart", data: populatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const buyerId = req.user._id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock available" });
    }

    const cart = await Cart.findOne({ buyer: buyerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = Number(quantity);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("items.product", "title price images");

    return res.status(200).json({ success: true, message: "Cart quantity updated", data: populatedCart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const cart = await Cart.findOne({ buyer: buyerId })
      .populate("items.product", "title price images seller");

    if (!cart) {
      return res.status(200).json({ success: true, data: { buyer: buyerId, items: [], totalPrice: 0 } });
    }

    return res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const buyerId = req.user._id;

    const cart = await Cart.findOne({ buyer: buyerId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return res.status(200).json({ success: true, message: "Cart cleared", data: cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
