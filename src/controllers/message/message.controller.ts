/** Library */
import { Request, Response, NextFunction } from "express";

/** Service */
import {
  Message,
  MessageService,
} from "../../services/message/message.service";

/** DTOs */
import { LikeMessageDTO } from "routes/message/dtos/LikeMessage.dto";
import { DislikeMessageDTO } from "routes/message/dtos/DislikeMessage.dto";

export class MessageController {
  static async getAllMessages(
    _req: Request,
    res: Response<Message[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const messages = await MessageService.getAllMessages();
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }

  static async likeMessage(
    req: Request<{}, {}, LikeMessageDTO>,
    res: Response<Message[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, likedValue } = req?.body || {};
      const message = await MessageService.likeMessage({ id, likedValue });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async disLikeMessage(
    req: Request<{}, {}, DislikeMessageDTO>,
    res: Response<Message[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, dislikedValue } = req?.body;
      const message = await MessageService.dislikeMessage({
        id,
        dislikedValue,
      });
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async getRandomUnusedMessageAndMarkUsed(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const message = await MessageService.getRandomUnusedMessageAndMarkUsed();
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async getMessageBasedOnId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.params.id) {
        res.status(404).json({ isSuccess: false });
      }

      const message = await MessageService.getMessageBasedOnId(
        `${req.params.id}`
      );
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
}
