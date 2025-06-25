/** Library */
import { Router } from 'express';

/** Route */
import messageRoutes from './message/message.route';

const router = Router();

/** Messages routes */
router.use('/messages', messageRoutes);

export default router;
