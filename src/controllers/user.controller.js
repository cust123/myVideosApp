import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinaryFileUpload.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required!");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }
  console.log(req.files);

  const avatarLocalPath = req.files?.avator[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Qvatar file is required!");
  }

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image is required!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new apiError(400, "Avatar is Required!");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refershToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering user!");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "user registered successfully!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "User Name or Email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
});

export { registerUser, loginUser };

// if (fullname === "") {
//   throw new apiError(400, "full name is required");
// }
