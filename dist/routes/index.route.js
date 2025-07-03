"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Library */
const express_1 = require("express");
/** Route */
const message_route_1 = __importDefault(require("./message/message.route"));
const router = (0, express_1.Router)();
/** Messages routes */
router.use('/messages', message_route_1.default);
exports.default = router;
