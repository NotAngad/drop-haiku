'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MessageService = void 0;
const Message_1 = require('../../models/message/Message');
class MessageService {
  static async getAllMessages() {
    const messages = await Message_1.Messages.find({});
    return messages;
  }
  static async getRandomUnusedMessageAndMarkUsed() {
    try {
      const [randomMsg] = await Message_1.Messages.aggregate([
        { $match: { hasBeenUsed: false } },
        { $sample: { size: 1 } },
      ]);
      if (!randomMsg) {
        return null;
      }
      const updatedMessage = await Message_1.Messages.findByIdAndUpdate(
        randomMsg._id,
        { hasBeenUsed: true },
        { new: true },
      );
      return updatedMessage;
    } catch (error) {
      console.error('Logging error in getRandomUnusedMessageAndMarkUsed', { error });
      return null;
    }
  }
  static async getMessageBasedOnId(id) {
    try {
      const message = await Message_1.Messages.findOne({ _id: id });
      return message;
    } catch (error) {
      console.error('Logging error in getMessageBasedOnId', { error });
      return null;
    }
  }
  static async likeDislikeMessage({ id, type, value }) {
    try {
      const message = await Message_1.Messages.findByIdAndUpdate(
        id,
        { [type]: value },
        { new: true },
      );
      return message;
    } catch (error) {
      console.error('Logging error in likeDislikeMessage', { error });
      return null;
    }
  }
}
exports.MessageService = MessageService;
