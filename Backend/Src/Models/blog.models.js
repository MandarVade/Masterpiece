import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    default: "general"
  }
}, {
  timestamps: true
});

export const Blog = mongoose.model("Blog", BlogSchema);
