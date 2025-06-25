/** Model */
import { Messages } from "../../models/message/Message";

/** DTOs */
import { LikeMessageDTO } from "routes/message/dtos/LikeMessage.dto";
import { DislikeMessageDTO } from "routes/message/dtos/DislikeMessage.dto";

export interface Message {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MessageService {
  static async getAllMessages(): Promise<any[]> {
    const messages = await Messages.find({});
    return messages;
  }

  static async likeMessage({ id, likedValue }: LikeMessageDTO): Promise<any> {
    const updatedMessage = await Messages.findByIdAndUpdate(
      id,
      { liked: likedValue },
      { new: true }
    );

    return updatedMessage;
  }

  static async dislikeMessage({
    id,
    dislikedValue,
  }: DislikeMessageDTO): Promise<any> {
    const updatedMessage = await Messages.findByIdAndUpdate(
      id,
      { disliked: dislikedValue },
      { new: true }
    );

    return updatedMessage;
  }

  static async getRandomUnusedMessageAndMarkUsed() {
    const [randomMsg] = await Messages.aggregate([
      { $match: { hasBeenUsed: false } },
      { $sample: { size: 1 } },
    ]);

    if (!randomMsg) {
      console.log("No unused messages found");
      return null;
    }

    const updatedMessage = await Messages.findByIdAndUpdate(
      randomMsg._id,
      { hasBeenUsed: true },
      { new: true }
    );

    return updatedMessage;
  }

  static async getMessageBasedOnId(id: string) {
    const message = await Messages.find({ _id: id });
    return message;
  }
}
