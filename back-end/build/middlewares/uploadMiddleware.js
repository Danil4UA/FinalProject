"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// Настройка хранилища для файлов
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Указываем папку для загрузки файлов
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Генерация имени файла
    }
});
exports.upload = (0, multer_1.default)({ storage });
