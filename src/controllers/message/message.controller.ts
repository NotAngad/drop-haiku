/** Library */
import { Request, Response, NextFunction } from 'express';

/** Service */
import { MessageService } from '../../services/message/message.service';

/** Model */
import { IMessageDocument } from 'models/message/Message';

/** DTO */
import { LikeDislikeMessageDTO } from 'routes/message/dtos/LikeDislikeMessage.dto';
import { SeenMessageDTO } from 'routes/message/dtos/SeenMessage.dto';

export class MessageController {
  static async getAllMessages(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { messages, totalCount }: any = await MessageService.getAllMessages({
        pageNumber: Number(req?.query?.pageNumber) || null,
        limit: Number(req?.query?.limit) || null,
      });

      return res.status(200).json({
        isSuccess: true,
        data: { messages, totalCount },
        statusCode: 200,
        message: 'Record fetched successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRandomUnusedMessageAndMarkUsed(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const message = await MessageService.getRandomUnusedMessageAndMarkUsed();

      if (!message) {
        return res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        data: message,
        statusCode: 200,
        message: 'Record fetched successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMessageBasedOnId(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          isSuccess: false,
          data: {},
          statusCode: 400,
          message: `Bad Request`,
        });
      }

      const message: IMessageDocument | null = await MessageService.getMessageBasedOnId(`${id}`);

      if (!message) {
        return res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        data: message,
        statusCode: 200,
        message: 'Record fetched successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async likeDislikeMessage(
    req: Request<{}, {}, LikeDislikeMessageDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id, value, type } = req?.body || {};

      const message: IMessageDocument | null = await MessageService.likeDislikeMessage({
        id,
        type,
        value,
      });

      if (!message) {
        return res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        data: message,
        statusCode: 200,
        message: 'Record updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSeenMessages(
    req: Request<{}, {}, {}, SeenMessageDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { pageNumber, limit } = req?.query || {};

      if (!pageNumber || !limit) {
        return res.status(400).json({
          isSuccess: false,
          data: {},
          statusCode: 400,
          message: `Bad Request`,
        });
      }

      const { messages, totalCount } = await MessageService.getSeenMessages({
        pageNumber: Number(pageNumber),
        limit: Number(limit),
      });

      if (!messages || !messages?.length) {
        return res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }

      return res.status(200).json({
        isSuccess: true,
        data: { messages, totalCount },
        statusCode: 200,
        message: 'Record updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
}
