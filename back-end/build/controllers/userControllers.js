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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const userModel_1 = require("../models/userModel");
const userProfileModel_1 = require("../models/userProfileModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const { ACCESS_TOKEN_SECRET } = process.env;
exports.userControllers = {
    registerUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const userInfo = { email, password };
        try {
            // Check if user exists
            const ifUserExist = yield userModel_1.userModules.getUserByEmail(userInfo.email);
            if (ifUserExist) {
                res.status(409).json({ message: "User already exists" });
            }
            else {
                // Create new user and profile
                const user = yield userModel_1.userModules.createUser(userInfo);
                const profileInfo = {
                    userId: user.id,
                    firstName: "New",
                    lastName: "User"
                };
                const userProfile = yield userProfileModel_1.userProfileModules.createUserProfile(profileInfo);
                res.status(201).json({
                    message: "User is registered successfully",
                    user,
                    userProfile
                });
            }
        }
        catch (error) {
            console.error("Error registering user: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }),
    // put any response because return doesnt work withou it.
    // ask ziv why
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const user = yield userModel_1.userModules.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const passwordMatch = yield bcrypt_1.default.compare(password + "", user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Auth failed" });
            }
            const accessToken = jsonwebtoken_1.default.sign({ userid: user.id, email: user.email }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000,
            });
            return res.status(200).json({
                message: "Login success",
                user: { userid: user.id, email: user.email },
                accessToken: accessToken,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.userModules.getUsers();
            res.status(200).json({
                message: "users are fetched successfully",
                users
            });
        }
        catch (error) {
            console.log(error);
        }
    }),
    verifyAuth: (req, res) => {
        // req any type because i didn't add useid to the interface 
        // res any type because without it i cannot use return . it throws an error
        if (!req.body.userid || !req.body.email) {
            res.status(400).json({ message: "Invalid data" });
        }
        else {
            const accessToken = jsonwebtoken_1.default.sign({ userid: req.body.userid, email: req.body.email }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            });
            res.json({
                message: "Auth success",
                user: { userid: req.userid, email: req.email },
                accessToken
            });
        }
    },
    logoutUser: (req, res) => {
        res.cookie("accessToken", {
            httpOnly: true,
            secure: true,
            maxAge: -1,
        });
        req.cookies.accessToken = null;
        req.body = {};
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true, // Make sure you set secure flag in production
            // sameSite: "strict", // To avoid CSRF attacks,
            // path: "/",
            // domain: "localhost"
        });
        console.log(req.cookies.accessToken, "i am log out");
        res.status(200).json({ message: "Logout successful" });
    },
};
