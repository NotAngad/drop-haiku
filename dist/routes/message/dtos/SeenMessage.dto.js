"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const seenMessageSchema = joi_1.default.object({
    pageNumber: joi_1.default.required().messages({
        'any.required': `"pageNumber" is required`,
    }),
    limit: joi_1.default.required().messages({
        'any.required': `"limit" is required`,
    }),
});
exports.default = seenMessageSchema;
