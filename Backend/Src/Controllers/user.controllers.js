import { asyncHandler } from "../Utils/asyncHandler.js";
import { APIError } from "../Utils/APIError.js";
import { User } from "../Models/user.models.js";
import { uploadoncloudinary } from "../Utils/cloudinary.js";
import { ApiResponse } from "../Utils/APIResponse.js";
import jwt from "jsonwebtoken";

const genratetokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.genrateRefreshToken();
    const accessToken = user.genrateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = req.body;

  if ([fullname, username, email, password].some((field) => !field || !field.trim())) {
    throw new APIError(400, "All fields are required."); 
  }
  const checkExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (checkExist) {
    throw new APIError(409, "User with email or username already exists.");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  let coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new APIError(400, "Avatar file is required.");
  }

  const avatar = await uploadoncloudinary(avatarLocalPath);
  const coverImage = await uploadoncloudinary(coverImageLocalPath);

  if (!avatar?.url) {
    throw new APIError(400, "Failed to upload avatar to cloud.");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    password,
    email,
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully.")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!password || (!username && !email)) {
    throw new APIError(400, "Email or username and password are required.");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new APIError(404, "User does not exist");
  }

  const isValidPass = await user.isPasswordCorrect(password);
  if (!isValidPass) {
    throw new APIError(401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await genratetokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const changes = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      }
    },
    {
      new: true,
    }
  )
  // console.log("changes during logout made are:", changes);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {},
        "User logged out successfully"
      )
    );
})

const refreshaccesstoken = asyncHandler(async (req, res) => {
  const incomingtoken = req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingtoken) {
    throw new APIError(401, "unauthorized request");
  }
  try {
    const decodedtoken = jwt.verify(incomingtoken, process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedtoken?._id);
    if (!user) {
      throw new APIError(401, "invalid refres token");
    }
    if (incomingtoken !== user?.refreshToken) {
      throw new APIError(401, "refresh token used or expired")
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newrefreshToken } = await genratetokens(user._id)
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken, newrefreshToken,
          },
          "access token refresed successfully"
        )
      );
  } catch (error) {
    throw new APIError(401, "invalid refresh token")
  }
})

const changepassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;
  if (!(newpassword === confirmpassword)) {
    throw new APIError(400, "new password and confirm password did not match");
  }
  const user = await User.findById(req.user?._id);
  const ispasswordCorrect = await user.isPasswordCorrect(oldpassword)
  if (!ispasswordCorrect) {
    throw new APIError(400, "invalid old password");
  }
  user.password = newpassword;
  await user.save({ validateBeforeSave: false });
  return res.status(200).json(new ApiResponse(200, "password changes successfully"))

})

const getcurrentuser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

const updateuser = asyncHandler(async (req, res) => {
  const { email, fullname } = req.body;
  if (!fullname || !email) {
    throw new APIError(400, "All fields are required");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname: fullname,
        email: email,
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res.status(200).json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const changeavatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new APIError(400, "avatar file missing")
  }
  const avatar = await uploadoncloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new APIError(400, "error while uploading avatar");
  }
  const updateduser = await User.findByIdAndUpdate(req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      }
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, updateduser, "avatar updated successfully")
  )
})

const changecoverimg = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new APIError(400, "cover image file missing")
  }
  const coverImage = await uploadoncloudinary(coverImageLocalPath);
  if (!coverImage.url) {
    throw new APIError(400, "error while uploading cover image");
  }
  const updateduser = await User.findByIdAndUpdate(req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      }
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res.status(200).json(
    new ApiResponse(200, updateduser, "cover image updated successfully")
  )
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new APIError(400, "username is missing")
  }
  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase()
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers"
      }
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo"
      }
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers"
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo"
        },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false
          }
        }
      }
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1

      }
    }
  ])
  if (!channel?.length) {
    throw new APIError(404, "channel does not exists")
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
})




export {
  registerUser, loginUser,
  logoutUser, refreshaccesstoken,
  changepassword, getcurrentuser,
  updateuser, changeavatar,
  changecoverimg, getUserChannelProfile
};


// http://localhost:8000/users/register