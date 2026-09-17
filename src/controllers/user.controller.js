import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // check if user is already logged in or not
  // check if they already have account 
  // now take user details by the front end
  // send those details to the backend
  // check does those are valid or not
  // check those details are already ther or not
  // check for avatar req
  // uploading on cloudnary, avatar
  // create user obj - create entry in db
  // remvoe and refresh token field from res
  // return res


  const { fullNname, userName, email, password } = req.body
  console.log("email: ", email)
  if (
    [fullNname, email, userName, password].some((field) =>
      field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const exitedUser = await User.findOne({
    $or: [{ userName }, { email }]
  })

  if (exitedUser) {
    throw new ApiError(409, "User with email or username already exist")
  }
  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar field is required")
  }


  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImage)
  if (!avatar) {
    throw new ApiError(400, "Avatar field is required")
  }

  const user = await User.create({
    fullNname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: username.tolowercase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user")
  }
  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Succesfully")
  )
})

export { registerUser }
