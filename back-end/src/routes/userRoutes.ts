import express, {Response, Request} from "express"
import { userControllers } from "../controllers/userControllers"
import {verifyAccessToken} from "../middlewares/verifyToken"
const router = express.Router()

router.post("/register", userControllers.registerUsers)
router.post("/login", userControllers.loginUser)
router.get("/logout", userControllers.logoutUser)

router.get("/all", verifyAccessToken, userControllers.getUsers)
router.get("/auth", verifyAccessToken, userControllers.verifyAuth)


export default router