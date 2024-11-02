import { Request, Response } from "express";
import { userProfileModules } from "../models/userProfileModel";

export const userProfileController = {
  createUserProfile: async (req: Request, res: Response) => {
    const { userId, firstName, lastName, profilePhotoUrl, facebookUrl, instagramUrl } = req.body;

    try {
      const profile = await userProfileModules.createUserProfile({
        userId,
        firstName,
        lastName,
        profilePhotoUrl,
        facebookUrl,
        instagramUrl,
      });
      res.status(201).json({ message: "Profile created successfully", profile });
    } catch (error:any) {
      res.status(500).json({ message: "Error creating profile", error: error.message });
    }
  },

  getUserProfile: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const profile = await userProfileModules.getUserProfileById(Number(userId));
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    } catch (error:any) {
      res.status(500).json({ message: "Error retrieving profile", error: error.message });
    }
  },

  updateUserProfile: async (req: Request, res: Response) => {
    const { userId } = req.params;
    const profileData = req.body;

    try {
    let updatedProfile = await userProfileModules.updateUserProfile(Number(userId), profileData); 
    res.status(200).json({ message: "Profile updated successfully", updatedProfile });
      

    } catch (error: any) {
      res.status(500).json({ message: "Error updating profile", error: error.message });
    }
  },

  deleteUserProfile: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const deleted = await userProfileModules.deleteUserProfile(Number(userId));
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    } catch (error:any) {
      res.status(500).json({ message: "Error deleting profile", error: error.message });
    }
  },
};
