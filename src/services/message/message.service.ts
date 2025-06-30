/** Model */
import { LikeDislikeMessageDTO } from 'routes/message/dtos/LikeDislikeMessage.dto';
import { IMessageDocument, Messages } from '../../models/message/Message';

export interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MessageService {
  static async getAllMessages(data: {
    pageNumber: number | null;
    limit: number | null;
  }): Promise<any> {
    const { pageNumber, limit } = data;
    let messages,
      totalCount = 0;

    if (pageNumber && limit) {
      const skip = (pageNumber - 1) * limit;
      const [paginatedMessages, paginatedTotalCount] = await Promise.all([
        Messages.find({}).skip(skip).limit(limit),
        Messages.countDocuments({}),
      ]);
      messages = paginatedMessages;
      totalCount = paginatedTotalCount;
    } else {
      messages = await Messages.find({});
    }

    return { messages, totalCount };
  }

  static async getRandomUnusedMessageAndMarkUsed(): Promise<IMessageDocument | null> {
    try {
      const [randomMsg] = await Messages.aggregate([
        {
          $match: {
            $or: [{ hasBeenUsed: false }, { liked: false, disliked: false }],
          },
        },
        { $sample: { size: 1 } },
      ]);

      if (!randomMsg) {
        return null;
      }

      const updatedMessage = await Messages.findByIdAndUpdate(
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

  static async getMessageBasedOnId(id: string): Promise<IMessageDocument | null> {
    try {
      const message = await Messages.findOne({ _id: id });
      return message;
    } catch (error) {
      console.error('Logging error in getMessageBasedOnId', { error });
      return null;
    }
  }

  static async likeDislikeMessage({
    id,
    type,
    value,
  }: LikeDislikeMessageDTO): Promise<IMessageDocument | null> {
    try {
      const message = await Messages.findByIdAndUpdate(id, { [type]: value }, { new: true });
      return message;
    } catch (error) {
      console.error('Logging error in likeDislikeMessage', { error });
      return null;
    }
  }

  static async getSeenMessages({
    pageNumber,
    limit,
  }: {
    pageNumber: number;
    limit: number;
  }): Promise<any> {
    try {
      const skip = (pageNumber - 1) * limit;

      const [messages, totalCount] = await Promise.all([
        Messages.find({ hasBeenUsed: true }).skip(skip).limit(limit),
        Messages.countDocuments({ hasBeenUsed: true }),
      ]);

      return { messages, totalCount };
    } catch (error) {
      console.error('Logging error in getSeenMessages', { error });
      return null;
    }
  }
}
