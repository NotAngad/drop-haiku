import Joi from 'joi';

const likeDislikeSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': `"id" is required`,
    'string.base': `"id" must be a string`,
  }),
  type: Joi.string().valid('liked', 'disliked').required().messages({
    'any.only': `"type" must be either 'liked' or 'disliked'`,
    'any.required': `"type" is required`,
  }),
  value: Joi.boolean().strict().required().messages({
    'any.required': `"value" is required`,
    'boolean.base': `"value" must be a boolean (true or false)`,
  }),
});

export interface LikeDislikeMessageDTO {
  id: string;
  type: 'liked' | 'disliked';
  value: boolean;
}

export default likeDislikeSchema;
