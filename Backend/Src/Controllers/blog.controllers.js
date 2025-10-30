import { Blog } from "../Models/blog.models.js";
import { uploadoncloudinary } from "../Utils/cloudinary.js";

export const createBlog = async (req, res) => {
  try {
    const { title, shortDescription, content, category } = req.body;

    if (!title || !shortDescription || !content) {
      return res.status(400).json({ message: "title, shortDescription and content are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "coverImage is required" });
    }

    const coverUpload = await uploadoncloudinary(req.file.path);
    if (!coverUpload) {
      return res.status(400).json({ message: "Failed to upload cover image" });
    }

    const coverImageUrl = coverUpload.secure_url || coverUpload.url;

    const blog = await Blog.create({
      title,
      shortDescription,
      content,
      coverImage: coverImageUrl,
      category: category || "general",
      author: req.user._id
    });

    return res.status(201).json({ success: true, message: "Blog created successfully", data: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("author", "fullname avatar email");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } }
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const blogs = await Blog.find(filter)
      .populate("author", "fullname avatar")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments(filter);

    return res.status(200).json({
      success: true,
      data: blogs,
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

export const getAuthorBlogs = async (req, res) => {
  try {
    const authorId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const blogs = await Blog.find({ author: authorId })
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    const total = await Blog.countDocuments({ author: authorId });

    return res.status(200).json({
      success: true,
      data: blogs,
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

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, shortDescription, content, category } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: Only author can update this blog" });
    }

    let coverImageUrl = blog.coverImage;
    if (req.file) {
      const coverUpload = await uploadoncloudinary(req.file.path);
      if (coverUpload) {
        coverImageUrl = coverUpload.secure_url || coverUpload.url;
      }
    }

    blog.title = title || blog.title;
    blog.shortDescription = shortDescription || blog.shortDescription;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    blog.coverImage = coverImageUrl;

    await blog.save();

    return res.status(200).json({ success: true, message: "Blog updated successfully", data: blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized: Only author can delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
