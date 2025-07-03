"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Library */
const express_1 = require("express");
/** Middleware */
const validateBody_1 = __importDefault(require("../../middlewares/validateBody"));
/** DTO */
const SeenMessage_dto_1 = __importDefault(require("./dtos/SeenMessage.dto"));
const LikeDislikeMessage_dto_1 = __importDefault(require("./dtos/LikeDislikeMessage.dto"));
/** Controller */
const message_controller_1 = require("../../controllers/message/message.controller");
const tryCatchWrapper_1 = require("utils/tryCatchWrapper");
const router = (0, express_1.Router)();
/** Get all messages */
router.get('/', (0, tryCatchWrapper_1.tryCatchWrapper)(message_controller_1.MessageController.getAllMessages));
/** Get a message on random */
router.get('/random-message', (0, tryCatchWrapper_1.tryCatchWrapper)(message_controller_1.MessageController.getRandomUnusedMessageAndMarkUsed));
/** Like/dislike a message */
router.post('/like-dislike-message', (0, validateBody_1.default)(LikeDislikeMessage_dto_1.default), (0, tryCatchWrapper_1.tryCatchWrapper)(message_controller_1.MessageController.likeDislikeMessage));
/** Get all seen message in a pagination format */
router.get('/get-seen-messages', (0, validateBody_1.default)(SeenMessage_dto_1.default, true), (0, tryCatchWrapper_1.tryCatchWrapper)(message_controller_1.MessageController.getSeenMessages));
/** Get a message based on Id */
router.get('/:id', (0, tryCatchWrapper_1.tryCatchWrapper)(message_controller_1.MessageController.getMessageBasedOnId));
exports.default = router;
