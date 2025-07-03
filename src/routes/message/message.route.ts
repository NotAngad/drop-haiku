/** Library */
import { Router } from 'express';

/** Middleware */
import validateBody from '../../middlewares/validateBody';

/** DTO */
import seenMessageSchema from './dtos/SeenMessage.dto';
import likeDislikeSchema from './dtos/LikeDislikeMessage.dto';

/** Controller */
import { MessageController } from '../../controllers/message/message.controller';
import { tryCatchWrapper } from 'utils/tryCatchWrapper';

const router = Router();

/** Get all messages */
router.get('/', tryCatchWrapper(MessageController.getAllMessages));

/** Get a message on random */
router.get('/random-message', tryCatchWrapper(MessageController.getRandomUnusedMessageAndMarkUsed));

/** Like/dislike a message */
router.post(
  '/like-dislike-message',
  validateBody(likeDislikeSchema),
  tryCatchWrapper(MessageController.likeDislikeMessage),
);

/** Get all seen message in a pagination format */
router.get(
  '/get-seen-messages',
  validateBody(seenMessageSchema, true),
  tryCatchWrapper(MessageController.getSeenMessages),
);

/** Get a message based on Id */
router.get('/:id', tryCatchWrapper(MessageController.getMessageBasedOnId));

export default router;
