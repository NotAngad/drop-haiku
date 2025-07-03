"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGO_URI || '';
const DB_NAME = process.env.MONGO_DB_NAME || '';
const connectDB = async () => {
    if (mongoose_1.default.connection.readyState >= 1)
        return;
    await mongoose_1.default.connect(MONGODB_URI, {
        dbName: DB_NAME,
    });
    console.log('✅ Connected to MongoDB Atlas');
};
exports.connectDB = connectDB;
