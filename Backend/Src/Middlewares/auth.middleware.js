import { asyncHandler } from "../Utils/asyncHandler.js";
import { APIError } from "../Utils/APIError.js";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.models.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    if (!token) {
        throw new APIError(401, "Unauthorized request");
    }
    const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // console.log("what we are gettin from cookies is:",token);
    
    const user = await User.findById(decodedtoken?._id).select("-password -refreshToken");
    if (!user) {
        throw new APIError(401, "invalid access token")
    }
    // console.log("stuff in user is:",user);

    req.user=user;
    next();
})

export { verifyJwt }