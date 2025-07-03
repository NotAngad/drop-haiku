"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const Message_1 = require("../../models/message/Message");
class MessageService {
    static async getAllMessages(data) {
        const { pageNumber, limit } = data;
        let messages, totalCount = 0;
        if (pageNumber && limit) {
            const skip = (pageNumber - 1) * limit;
            const [paginatedMessages, paginatedTotalCount] = await Promise.all([
                Message_1.Messages.find({}).skip(skip).limit(limit),
                Message_1.Messages.countDocuments({}),
            ]);
            messages = paginatedMessages;
            totalCount = paginatedTotalCount;
        }
        else {
            messages = await Message_1.Messages.find({});
        }
        return { messages, totalCount };
    }
    static async getRandomUnusedMessageAndMarkUsed() {
        try {
            const [randomMsg] = await Message_1.Messages.aggregate([
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
            const updatedMessage = await Message_1.Messages.findByIdAndUpdate(randomMsg._id, { hasBeenUsed: true }, { new: true });
            return updatedMessage;
        }
        catch (error) {
            console.error('Logging error in getRandomUnusedMessageAndMarkUsed', { error });
            return null;
        }
    }
    static async getMessageBasedOnId(id) {
        try {
            const message = await Message_1.Messages.findOne({ _id: id });
            return message;
        }
        catch (error) {
            console.error('Logging error in getMessageBasedOnId', { error });
            return null;
        }
    }
    static async likeDislikeMessage({ id, type, value, }) {
        try {
            const message = await Message_1.Messages.findByIdAndUpdate(id, { [type]: value }, { new: true });
            return message;
        }
        catch (error) {
            console.error('Logging error in likeDislikeMessage', { error });
            return null;
        }
    }
    static async getSeenMessages({ pageNumber, limit, }) {
        try {
            const skip = (pageNumber - 1) * limit;
            const [messages, totalCount] = await Promise.all([
                Message_1.Messages.find({ hasBeenUsed: true }).skip(skip).limit(limit),
                Message_1.Messages.countDocuments({ hasBeenUsed: true }),
            ]);
            return { messages, totalCount };
        }
        catch (error) {
            console.error('Logging error in getSeenMessages', { error });
            return null;
        }
    }
}
exports.MessageService = MessageService;
