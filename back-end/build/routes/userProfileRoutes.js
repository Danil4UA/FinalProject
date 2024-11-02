"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userProfileController_1 = require("../controllers/userProfileController");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.post("/create", verifyToken_1.verifyAccessToken, userProfileController_1.userProfileController.createUserProfile);
router.get("/get/:userId", userProfileController_1.userProfileController.getUserProfile);
router.put("/update/:userId", verifyToken_1.verifyAccessToken, userProfileController_1.userProfileController.updateUserProfile);
router.delete("/delete/:userId", verifyToken_1.verifyAccessToken, userProfileController_1.userProfileController.deleteUserProfile);
exports.default = router;
