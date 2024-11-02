"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const userProfileRoutes_1 = __importDefault(require("./routes/userProfileRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;
app.use("/api/users", userRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
app.use("/api/profiles", userProfileRoutes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
