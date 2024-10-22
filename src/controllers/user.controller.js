import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  if (
    [fullname, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required!");
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] });
});

if (existedUser) {
  throw new ApiError(409, "User with email or username already exist");
}

export { registerUser };

// if (fullname === "") {
//   throw new apiError(400, "full name is required");
// }
