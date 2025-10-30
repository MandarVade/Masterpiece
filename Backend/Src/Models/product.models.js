import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  medium: {
    type: String,
    trim: true
  },
  dimensions: {
    height: Number,
    width: Number,
    depth: Number,
    unit: {
      type: String,
      default: "cm"
    }
  },
  yearCreated: {
    type: Number
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 1,
    min: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", ProductSchema);
