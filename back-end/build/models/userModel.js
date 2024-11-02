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
exports.userModules = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.userModules = {
    createUser: (userinfo) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = userinfo;
        const trx = yield db_1.db.transaction();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password + "", salt);
            const [user] = yield trx("authusers").insert({ email, password: hashedPassword }, ["email", "id"]);
            yield trx.commit();
            return user;
        }
        catch (error) {
            yield trx.rollback();
            console.log(error);
            throw error;
        }
    }),
    getUserByEmail: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (email = "") {
        return yield (0, db_1.db)("authusers")
            .select("id", "email", "password")
            .where({ email })
            .first();
    }),
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield (0, db_1.db)("authusers")
                .select("id", "email", "password");
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    })
};
