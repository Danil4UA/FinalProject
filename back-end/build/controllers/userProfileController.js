"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileController = void 0;
const userProfileModel_1 = require("../models/userProfileModel");
exports.userProfileController = {
    createUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, firstName, lastName, profilePhotoUrl, facebookUrl, instagramUrl } = req.body;
        try {
            const profile = yield userProfileModel_1.userProfileModules.createUserProfile({
                userId,
                firstName,
                lastName,
                profilePhotoUrl,
                facebookUrl,
                instagramUrl,
            });
            res.status(201).json({ message: "Profile created successfully", profile });
        }
        catch (error) {
            res.status(500).json({ message: "Error creating profile", error: error.message });
        }
    }),
    getUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const profile = yield userProfileModel_1.userProfileModules.getUserProfileById(Number(userId));
            if (profile) {
                res.status(200).json(profile);
            }
            else {
                res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error retrieving profile", error: error.message });
        }
    }),
    updateUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        const profileData = req.body;
        try {
            let updatedProfile = yield userProfileModel_1.userProfileModules.updateUserProfile(Number(userId), profileData);
            res.status(200).json({ message: "Profile updated successfully", updatedProfile });
        }
        catch (error) {
            res.status(500).json({ message: "Error updating profile", error: error.message });
        }
    }),
    deleteUserProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.params;
        try {
            const deleted = yield userProfileModel_1.userProfileModules.deleteUserProfile(Number(userId));
            if (deleted) {
                res.status(204).send();
            }
            else {
                res.status(404).json({ message: "Profile not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Error deleting profile", error: error.message });
        }
    }),
};
