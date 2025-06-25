/** Library */
import { Router } from 'express';

/** DTO */
import likeSchema from './dtos/LikeMessage.dto';
import dislikeSchema from './dtos/DislikeMessage.dto';

/** Middleware */
import validateBody from '../../middlewares/validateBody';

/** Controller */
import { MessageController } from '../../controllers/message/message.controller';

const router = Router();

/** Get all messages */
router.get('/', MessageController.getAllMessages);

/** Get a message on random */
router.get('/random-message', MessageController.getRandomUnusedMessageAndMarkUsed);

/** Like or revert your like on a message */
router.post('/like', validateBody(likeSchema), MessageController.likeMessage);

/** Dislike or revert your dislike on a message */
router.post('/dislike', validateBody(dislikeSchema), MessageController.disLikeMessage);

/** Get a message based on Id */
router.get('/:id', MessageController.getMessageBasedOnId);

export default router;
