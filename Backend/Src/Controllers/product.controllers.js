import { Product } from "../Models/product.models.js";
import { uploadoncloudinary } from "../Utils/cloudinary.js";

export const listingProduct = async (req, res) => {
  try {
    const { title, description, price, category, medium, yearCreated, tags } = req.body;
    const { height, width, depth, unit } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "title, description, price and category are required" });
    }

    if (!req.files || !req.files.images || req.files.images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload images to Cloudinary
    const imageUrls = [];
    for (const file of req.files.images) {
      const uploadResult = await uploadoncloudinary(file.path);
      if (uploadResult) {
        imageUrls.push(uploadResult.secure_url || uploadResult.url);
      }
    }

    if (imageUrls.length === 0) {
      return res.status(400).json({ message: "Failed to upload images" });
    }

    const product = await Product.create({
      title,
      description,
      price: Number(price),
      category,
      seller: req.user._id,
      images: imageUrls,
      medium,
      dimensions: height || width || depth ? { height, width, depth, unit: unit || "cm" } : undefined,
      yearCreated: yearCreated ? Number(yearCreated) : undefined,
      tags: tags ? (typeof tags === "string" ? tags.split(",") : tags) : []
    });

    return res.status(201).json({ success: true, message: "Product listed successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate("seller", "fullname email avatar");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, page = 1, limit = 10, sortBy = "-createdAt" } = req.query;

    const filter = { isAvailable: true };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter)
      .populate("seller", "fullname avatar")
      .sort(sortBy)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: products,
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

export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find({ seller: sellerId })
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({ seller: sellerId });

    return res.status(200).json({
      success: true,
      data: products,
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

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, price, category, medium, yearCreated, tags, stock, isAvailable } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: Only seller can update this product" });
    }

    // Handle new images if provided
    let imageUrls = product.images;
    if (req.files && req.files.images) {
      imageUrls = [];
      for (const file of req.files.images) {
        const uploadResult = await uploadoncloudinary(file.path);
        if (uploadResult) {
          imageUrls.push(uploadResult.secure_url || uploadResult.url);
        }
      }
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price ? Number(price) : product.price;
    product.category = category || product.category;
    product.medium = medium || product.medium;
    product.yearCreated = yearCreated ? Number(yearCreated) : product.yearCreated;
    product.images = imageUrls;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable;
    product.tags = tags ? (typeof tags === "string" ? tags.split(",") : tags) : product.tags;

    await product.save();

    return res.status(200).json({ success: true, message: "Product updated successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: Only seller can delete this product" });
    }

    await Product.findByIdAndDelete(productId);

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingReview = product.reviews.find(r => r.buyer.toString() === req.user._id.toString());
    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      product.reviews.push({
        buyer: req.user._id,
        rating,
        comment
      });
    }

    // Recalculate average rating
    const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
    product.rating = Math.round(avgRating * 10) / 10;

    await product.save();

    return res.status(200).json({ success: true, message: "Review added/updated successfully", data: product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const filter = { isAvailable: true };

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }
      ];
    }

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(filter)
      .populate("seller", "fullname avatar")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: products,
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
