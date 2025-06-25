import Joi from 'joi';

export const dislikeSchema = Joi.object({
  id: Joi.string().required(),
  likedValue: Joi.boolean().required(),
});

export interface DislikeMessageDTO {
  id: string;
  dislikedValue: boolean;
}

export default dislikeSchema;
