'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const joi_1 = __importDefault(require('joi'));
const likeDislikeSchema = joi_1.default.object({
  id: joi_1.default.string().required().messages({
    'any.required': `"id" is required`,
    'string.base': `"id" must be a string`,
  }),
  type: joi_1.default.string().valid('liked', 'disliked').required().messages({
    'any.only': `"type" must be either 'liked' or 'disliked'`,
    'any.required': `"type" is required`,
  }),
  value: joi_1.default.boolean().strict().required().messages({
    'any.required': `"value" is required`,
    'boolean.base': `"value" must be a boolean (true or false)`,
  }),
});
exports.default = likeDislikeSchema;
