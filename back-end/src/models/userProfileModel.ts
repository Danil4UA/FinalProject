import { db } from "../config/db";

export interface UserProfileInfo {
  userId: number;
  firstName: string;
  lastName: string;
  profilePhotoUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
}

export const userProfileModules = {
  createUserProfile: async (profileInfo: UserProfileInfo) => {
    const { userId, firstName, lastName, profilePhotoUrl, facebookUrl, instagramUrl } = profileInfo;
    const trx = await db.transaction();
    try {
      const [profile] = await trx("user_profiles").insert(
        {
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          profile_photo_url: profilePhotoUrl,
          facebook_url: facebookUrl,
          instagram_url: instagramUrl,
        },
        ["id", "user_id", "first_name", "last_name", "profile_photo_url", "facebook_url", "instagram_url"]
      );
      await trx.commit();
      return profile;
    } catch (error) {
      await trx.rollback();
      console.error("Error creating user profile:", error);
      throw error;
    }
  },

  getUserProfileById: async (userId: number) => {

    let profile = await db("user_profiles").where({ user_id: userId }).first();
    if (!profile) {
      const defaultProfile = {
        userId,
        firstName: "New",
        lastName: "User",
      }

      profile = await userProfileModules.createUserProfile(defaultProfile);
    }
    return profile;
  },

  updateUserProfile: async (userId: number, profileData: Partial<UserProfileInfo>) => {
    const trx = await db.transaction();
    try {
        const [updatedProfile] = await trx("user_profiles")
            .where({ user_id: userId })
            .update(
                {
                    first_name: profileData.firstName, // Update this line
                    last_name: profileData.lastName,     // Add this line if needed
                    profile_photo_url: profileData.profilePhotoUrl,
                    facebook_url: profileData.facebookUrl,
                    instagram_url: profileData.instagramUrl,
                    updated_at: db.fn.now(),
                },
                ["id", "user_id", "first_name", "last_name", "profile_photo_url", "facebook_url", "instagram_url"]
            );
        await trx.commit();
        return updatedProfile;
    } catch (error) {
        await trx.rollback();
        console.error("Error updating user profile:", error);
        throw error;
    }
},

  deleteUserProfile: async (userId: number) => {
    return await db("user_profiles").where({ user_id: userId }).del();
  },
};