"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageController = void 0;
/** Service */
const message_service_1 = require("../../services/message/message.service");
const constants_1 = require("utils/constants");
class MessageController {
    static async getAllMessages(req, res, next) {
        try {
            const { messages, totalCount } = await message_service_1.MessageService.getAllMessages({
                pageNumber: Number(req?.query?.pageNumber) || null,
                limit: Number(req?.query?.limit) || null,
            });
            return res.status(constants_1.RESOURCE_FOUND_CODE).json({
                isSuccess: true,
                data: { messages, totalCount },
                statusCode: constants_1.RESOURCE_FOUND_CODE,
                message: constants_1.RESOURCE_FOUND_MESSAGE,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getRandomUnusedMessageAndMarkUsed(_req, res, next) {
        try {
            const message = await message_service_1.MessageService.getRandomUnusedMessageAndMarkUsed();
            if (!message) {
                return res.status(constants_1.NOT_FOUND_CODE).send({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.NOT_FOUND_CODE,
                    message: constants_1.NOT_FOUND_MESSAGE,
                });
            }
            return res.status(constants_1.RESOURCE_FOUND_CODE).json({
                isSuccess: true,
                data: message,
                statusCode: constants_1.RESOURCE_FOUND_CODE,
                message: constants_1.RESOURCE_FOUND_MESSAGE,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMessageBasedOnId(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(constants_1.BAD_REQUEST_CODE).json({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.BAD_REQUEST_CODE,
                    message: constants_1.BAD_REQUEST_MESSAGE,
                });
            }
            const message = await message_service_1.MessageService.getMessageBasedOnId(`${id}`);
            if (!message) {
                return res.status(constants_1.NOT_FOUND_CODE).send({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.NOT_FOUND_CODE,
                    message: constants_1.NOT_FOUND_MESSAGE,
                });
            }
            return res.status(constants_1.RESOURCE_FOUND_CODE).json({
                isSuccess: true,
                data: message,
                statusCode: constants_1.RESOURCE_FOUND_CODE,
                message: constants_1.RESOURCE_FOUND_MESSAGE,
            });
        }
        catch (error) {
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
                return res.status(constants_1.NOT_FOUND_CODE).send({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.NOT_FOUND_CODE,
                    message: constants_1.NOT_FOUND_MESSAGE,
                });
            }
            return res.status(constants_1.RESOURCE_FOUND_CODE).json({
                isSuccess: true,
                data: message,
                statusCode: constants_1.RESOURCE_FOUND_CODE,
                message: constants_1.RESOURCE_UPDATED_MESSAGE,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getSeenMessages(req, res, next) {
        try {
            const { pageNumber, limit } = req?.query || {};
            if (!pageNumber || !limit) {
                return res.status(constants_1.BAD_REQUEST_CODE).json({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.BAD_REQUEST_CODE,
                    message: constants_1.BAD_REQUEST_MESSAGE,
                });
            }
            const { messages, totalCount } = await message_service_1.MessageService.getSeenMessages({
                pageNumber: Number(pageNumber),
                limit: Number(limit),
            });
            if (!messages || !messages?.length) {
                return res.status(constants_1.NOT_FOUND_CODE).send({
                    isSuccess: false,
                    data: {},
                    statusCode: constants_1.NOT_FOUND_CODE,
                    message: constants_1.NOT_FOUND_MESSAGE,
                });
            }
            return res.status(constants_1.RESOURCE_UPDATED_CODE).json({
                isSuccess: true,
                data: { messages, totalCount },
                statusCode: constants_1.RESOURCE_UPDATED_CODE,
                message: constants_1.RESOURCE_UPDATED_MESSAGE,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MessageController = MessageController;
