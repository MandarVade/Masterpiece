import jwt from "jsonwebtoken";

const getBoolean = (val) => String(val) === "true";

export const signAccessToken = (payload) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || "15m";
  return jwt.sign(payload, secret, { expiresIn });
};

export const signRefreshToken = (payload) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRY || "7d";
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyAccessToken = (token) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export const verifyRefreshToken = (token) => {
  const secret = process.env.REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export default {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
