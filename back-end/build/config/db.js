"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = __importDefault(require("knex"));
require("dotenv/config");
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const knexConfig = {
    client: "pg",
    connection: {
        host: PGHOST,
        port: PGPORT ? parseInt(PGPORT) : undefined,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
        ssl: { rejectUnauthorized: false }
    }
};
exports.db = (0, knex_1.default)(knexConfig);
