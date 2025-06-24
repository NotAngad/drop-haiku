// src/routes/message.route.ts
import { Router } from "express";
import { MessageController } from "../../controllers/message/message.controller";

const router = Router();

router.get("/", MessageController.getAllMessages);
router.get(
  "/random-message",
  MessageController.getRandomUnusedMessageAndMarkUsed
);
router.post("/like", MessageController.likeMessage);
router.post("/dislike", MessageController.disLikeMessage);
router.get("/:id", MessageController.getMessageBasedOnId);

export default router;
