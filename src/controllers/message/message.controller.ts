// src/controllers/message.controller.ts
import { Request, Response, NextFunction } from "express";
import {
  MessageService,
  Message,
} from "../../services/message/message.service";

export class MessageController {
  static async getAllMessages(
    req: Request,
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
    req: Request,
    res: Response<Message[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const message = await MessageService.likeMessage(
        req?.body?.id,
        req.body?.likedValue
      );
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async disLikeMessage(
    req: Request,
    res: Response<Message[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const message = await MessageService.dislikeMessage(
        req?.body?.id,
        req.body?.dislikedValue
      );
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async getRandomUnusedMessageAndMarkUsed(
    req: Request,
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
