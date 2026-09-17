import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router()
import { upload } from "../middlewares/multer.middleware.js";

router.post("/register", (req, res) => {
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
});

// router.post("/register", (req, res) => {
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
// });

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

export default router