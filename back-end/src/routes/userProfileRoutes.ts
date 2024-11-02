import express from "express";
import { userProfileController } from "../controllers/userProfileController";
import { verifyAccessToken } from "../middlewares/verifyToken";

const router = express.Router();

router.post("/create", verifyAccessToken, userProfileController.createUserProfile);
router.get("/get/:userId", userProfileController.getUserProfile);
router.put("/update/:userId", verifyAccessToken, userProfileController.updateUserProfile);
router.delete("/delete/:userId", verifyAccessToken, userProfileController.deleteUserProfile);

export default router;