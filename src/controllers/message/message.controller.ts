/** Library */
import { Request, Response, NextFunction } from 'express';

/** Service */
import { MessageService } from '../../services/message/message.service';

/** Model */
import { IMessageDocument } from 'models/message/Message';

/** DTO */
import { SeenMessageDTO } from 'routes/message/dtos/SeenMessage.dto';
import { LikeDislikeMessageDTO } from 'routes/message/dtos/LikeDislikeMessage.dto';

/** Utils */
import {
  NOT_FOUND_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_MESSAGE,
  RESOURCE_FOUND_CODE,
  BAD_REQUEST_MESSAGE,
  RESOURCE_UPDATED_CODE,
  RESOURCE_FOUND_MESSAGE,
  RESOURCE_UPDATED_MESSAGE,
} from '../../utils/constants';

export class MessageController {
  static async getAllMessages(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { messages, totalCount }: any = await MessageService.getAllMessages({
        pageNumber: Number(req?.query?.pageNumber) || null,
        limit: Number(req?.query?.limit) || null,
      });

      return res.status(RESOURCE_FOUND_CODE).json({
        isSuccess: true,
        data: { messages, totalCount },
        statusCode: RESOURCE_FOUND_CODE,
        message: RESOURCE_FOUND_MESSAGE,
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
        return res.status(NOT_FOUND_CODE).send({
          isSuccess: false,
          data: {},
          statusCode: NOT_FOUND_CODE,
          message: NOT_FOUND_MESSAGE,
        });
      }

      return res.status(RESOURCE_FOUND_CODE).json({
        isSuccess: true,
        data: message,
        statusCode: RESOURCE_FOUND_CODE,
        message: RESOURCE_FOUND_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMessageBasedOnId(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(BAD_REQUEST_CODE).json({
          isSuccess: false,
          data: {},
          statusCode: BAD_REQUEST_CODE,
          message: BAD_REQUEST_MESSAGE,
        });
      }

      const message: IMessageDocument | null = await MessageService.getMessageBasedOnId(`${id}`);

      if (!message) {
        return res.status(NOT_FOUND_CODE).send({
          isSuccess: false,
          data: {},
          statusCode: NOT_FOUND_CODE,
          message: NOT_FOUND_MESSAGE,
        });
      }

      return res.status(RESOURCE_FOUND_CODE).json({
        isSuccess: true,
        data: message,
        statusCode: RESOURCE_FOUND_CODE,
        message: RESOURCE_FOUND_MESSAGE,
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
        return res.status(NOT_FOUND_CODE).send({
          isSuccess: false,
          data: {},
          statusCode: NOT_FOUND_CODE,
          message: NOT_FOUND_MESSAGE,
        });
      }

      return res.status(RESOURCE_FOUND_CODE).json({
        isSuccess: true,
        data: message,
        statusCode: RESOURCE_FOUND_CODE,
        message: RESOURCE_UPDATED_MESSAGE,
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
        return res.status(BAD_REQUEST_CODE).json({
          isSuccess: false,
          data: {},
          statusCode: BAD_REQUEST_CODE,
          message: BAD_REQUEST_MESSAGE,
        });
      }

      const { messages, totalCount } = await MessageService.getSeenMessages({
        pageNumber: Number(pageNumber),
        limit: Number(limit),
      });

      if (!messages || !messages?.length) {
        return res.status(NOT_FOUND_CODE).send({
          isSuccess: false,
          data: {},
          statusCode: NOT_FOUND_CODE,
          message: NOT_FOUND_MESSAGE,
        });
      }

      return res.status(RESOURCE_UPDATED_CODE).json({
        isSuccess: true,
        data: { messages, totalCount },
        statusCode: RESOURCE_UPDATED_CODE,
        message: RESOURCE_UPDATED_MESSAGE,
      });
    } catch (error) {
      next(error);
    }
  }
}
