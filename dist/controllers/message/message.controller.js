'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessageController = void 0;
/** Service */
const message_service_1 = require('../../services/message/message.service');
class MessageController {
  static async getAllMessages(_req, res, next) {
    try {
      const messages = await message_service_1.MessageService.getAllMessages();
      if (!messages || !messages?.length) {
        res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }
      res.status(200).json({
        isSuccess: true,
        data: messages,
        statusCode: 200,
        message: 'Record updated successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
  static async getRandomUnusedMessageAndMarkUsed(_req, res, next) {
    try {
      const message = await message_service_1.MessageService.getRandomUnusedMessageAndMarkUsed();
      if (!message) {
        res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }
      res.status(200).json({
        isSuccess: true,
        data: message,
        statusCode: 200,
        message: 'Record fetched successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
  static async getMessageBasedOnId(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ isSuccess: false });
      }
      const message = await message_service_1.MessageService.getMessageBasedOnId(`${id}`);
      if (!message) {
        res.status(404).send({
          isSuccess: false,
          data: {},
          statusCode: 404,
          message: `The resource you requested could not be found.`,
        });
      }
      res.status(200).json({
        isSuccess: true,
        data: message,
        statusCode: 200,
        message: 'Record fetched successfully.',
      });
    } catch (error) {
      next(error);
    }
  }
  static async likeDislikeMessage(req, res, next) {
    try {
      const { id, value, type } = req?.body || {};
      const message = await message_service_1.MessageService.likeDislikeMessage({
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
}
exports.MessageController = MessageController;
