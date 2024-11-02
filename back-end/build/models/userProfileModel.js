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
exports.userProfileModules = void 0;
const db_1 = require("../config/db");
exports.userProfileModules = {
    createUserProfile: (profileInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, firstName, lastName, profilePhotoUrl, facebookUrl, instagramUrl } = profileInfo;
        const trx = yield db_1.db.transaction();
        try {
            const [profile] = yield trx("user_profiles").insert({
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                profile_photo_url: profilePhotoUrl,
                facebook_url: facebookUrl,
                instagram_url: instagramUrl,
            }, ["id", "user_id", "first_name", "last_name", "profile_photo_url", "facebook_url", "instagram_url"]);
            yield trx.commit();
            return profile;
        }
        catch (error) {
            yield trx.rollback();
            console.error("Error creating user profile:", error);
            throw error;
        }
    }),
    getUserProfileById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        let profile = yield (0, db_1.db)("user_profiles").where({ user_id: userId }).first();
        if (!profile) {
            const defaultProfile = {
                userId,
                firstName: "New",
                lastName: "User",
            };
            profile = yield exports.userProfileModules.createUserProfile(defaultProfile);
        }
        return profile;
    }),
    updateUserProfile: (userId, profileData) => __awaiter(void 0, void 0, void 0, function* () {
        const trx = yield db_1.db.transaction();
        try {
            const [updatedProfile] = yield trx("user_profiles")
                .where({ user_id: userId })
                .update({
                first_name: profileData.firstName, // Update this line
                last_name: profileData.lastName, // Add this line if needed
                profile_photo_url: profileData.profilePhotoUrl,
                facebook_url: profileData.facebookUrl,
                instagram_url: profileData.instagramUrl,
                updated_at: db_1.db.fn.now(),
            }, ["id", "user_id", "first_name", "last_name", "profile_photo_url", "facebook_url", "instagram_url"]);
            yield trx.commit();
            return updatedProfile;
        }
        catch (error) {
            yield trx.rollback();
            console.error("Error updating user profile:", error);
            throw error;
        }
    }),
    deleteUserProfile: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, db_1.db)("user_profiles").where({ user_id: userId }).del();
    }),
};
