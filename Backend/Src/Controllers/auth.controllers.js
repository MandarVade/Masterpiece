
import { User } from "../Models/user.models.js";
import { uploadoncloudinary } from "../Utils/cloudinary.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../Utils/jwt.util.js";

const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge,
});

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, bio, role } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "fullname, email and password are required" });
    }

    // handle files
    const avatarFile = req.files && req.files.avatar && req.files.avatar[0];
    const coverFile = req.files && req.files.coverImage && req.files.coverImage[0];

    if (!avatarFile) {
      return res.status(400).json({ message: "avatar image is required" });
    }

    const avatarUpload = await uploadoncloudinary(avatarFile.path);
    const coverUpload = coverFile ? await uploadoncloudinary(coverFile.path) : null;

    const avatarUrl = avatarUpload?.secure_url || avatarUpload?.url || "";
    const coverUrl = coverUpload?.secure_url || coverUpload?.url || "";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const user = await User.create({
      fullname,
      email,
      password,
      bio,
      role,
      avatar: avatarUrl,
      coverImage: coverUrl
    });

    // create tokens
    const accessToken = signAccessToken({ _id: user._id, email: user.email });
    const refreshToken = signRefreshToken({ _id: user._id });

    // cookie durations (fallbacks)
    const accessMaxAge = (process.env.ACCESS_TOKEN_COOKIE_MAXAGE && Number(process.env.ACCESS_TOKEN_COOKIE_MAXAGE)) || 1000 * 60 * 15; // 15 minutes
    const refreshMaxAge = (process.env.REFRESH_TOKEN_COOKIE_MAXAGE && Number(process.env.REFRESH_TOKEN_COOKIE_MAXAGE)) || 7 * 24 * 60 * 60 * 1000; // 7 days

    res.cookie("accessToken", accessToken, cookieOptions(accessMaxAge));
    res.cookie("refreshToken", refreshToken, cookieOptions(refreshMaxAge));

    return res.status(201).json({ success: true, message: "User registered", data: { user: { _id: user._id, fullname: user.fullname, email: user.email, avatar: user.avatar, role: user.role }, accessToken } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccessToken({ _id: user._id, email: user.email });
    const refreshToken = signRefreshToken({ _id: user._id });

    const accessMaxAge = (process.env.ACCESS_TOKEN_COOKIE_MAXAGE && Number(process.env.ACCESS_TOKEN_COOKIE_MAXAGE)) || 1000 * 60 * 15;
    const refreshMaxAge = (process.env.REFRESH_TOKEN_COOKIE_MAXAGE && Number(process.env.REFRESH_TOKEN_COOKIE_MAXAGE)) || 7 * 24 * 60 * 60 * 1000;

    res.cookie("accessToken", accessToken, cookieOptions(accessMaxAge));
    res.cookie("refreshToken", refreshToken, cookieOptions(refreshMaxAge));

    return res.status(200).json({ success: true, message: "Login successful", data: { user: { _id: user._id, fullname: user.fullname, email: user.email, avatar: user.avatar, role: user.role }, accessToken } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken", { httpOnly: true });
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const refreshaccesstoken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

    const payload = verifyRefreshToken(refreshToken);
    if (!payload || !payload._id) return res.status(401).json({ message: "Invalid refresh token" });

    const user = await User.findById(payload._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = signAccessToken({ _id: user._id, email: user.email });
    const accessMaxAge = (process.env.ACCESS_TOKEN_COOKIE_MAXAGE && Number(process.env.ACCESS_TOKEN_COOKIE_MAXAGE)) || 1000 * 60 * 15;
    res.cookie("accessToken", newAccessToken, cookieOptions(accessMaxAge));

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Could not refresh access token", error: error.message });
  }
};
