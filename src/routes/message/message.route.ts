/** Library */
import { Router } from 'express';

/** Middleware */
import validateBody from '../../middlewares/validateBody';

/** DTO */
import likeDislikeSchema from './dtos/LikeDislikeMessage.dto';

/** Controller */
import { MessageController } from '../../controllers/message/message.controller';

const router = Router();

/** Get all messages */
router.get('/', MessageController.getAllMessages);

/** Get a message on random */
router.get('/random-message', MessageController.getRandomUnusedMessageAndMarkUsed);

/** Like/dislike a message */
router.post(
  '/like-dislike-message',
  validateBody(likeDislikeSchema),
  MessageController.likeDislikeMessage,
);

/** Get a message based on Id */
router.get('/:id', MessageController.getMessageBasedOnId);

export default router;
