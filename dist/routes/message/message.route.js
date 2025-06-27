'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
/** Library */
const express_1 = require('express');
/** Middleware */
const validateBody_1 = __importDefault(require('../../middlewares/validateBody'));
/** DTO */
const LikeDislikeMessage_dto_1 = __importDefault(require('./dtos/LikeDislikeMessage.dto'));
/** Controller */
const message_controller_1 = require('../../controllers/message/message.controller');
const router = (0, express_1.Router)();
/** Get all messages */
router.get('/', message_controller_1.MessageController.getAllMessages);
/** Get a message on random */
router.get(
  '/random-message',
  message_controller_1.MessageController.getRandomUnusedMessageAndMarkUsed,
);
/** Like/dislike a message */
router.post(
  '/like-dislike-message',
  (0, validateBody_1.default)(LikeDislikeMessage_dto_1.default),
  message_controller_1.MessageController.likeDislikeMessage,
);
/** Get a message based on Id */
router.get('/:id', message_controller_1.MessageController.getMessageBasedOnId);
exports.default = router;
