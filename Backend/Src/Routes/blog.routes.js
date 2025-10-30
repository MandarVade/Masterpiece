import { Router } from "express";
import {
  createBlog,
  getBlogById,
  getAllBlogs,
  getAuthorBlogs,
  updateBlog,
  deleteBlog
} from "../Controllers/blog.controllers.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = Router();

// Public routes
router.route("/").get(getAllBlogs);
router.route("/:blogId").get(getBlogById);

// Private routes (Author only)
router.route("/").post(verifyJwt, upload.single("coverImage"), createBlog);
router.route("/author/blogs").get(verifyJwt, getAuthorBlogs);
router.route("/:blogId").put(verifyJwt, upload.single("coverImage"), updateBlog);
router.route("/:blogId").delete(verifyJwt, deleteBlog);

export default router;
