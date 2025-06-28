import Joi from 'joi';

const seenMessageSchema = Joi.object({
  pageNumber: Joi.required().messages({
    'any.required': `"pageNumber" is required`,
  }),
  limit: Joi.required().messages({
    'any.required': `"limit" is required`,
  }),
});

export interface SeenMessageDTO {
  pageNumber: string;
  limit: string;
}

export default seenMessageSchema;
