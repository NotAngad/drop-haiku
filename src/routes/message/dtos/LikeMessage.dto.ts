import Joi from "joi";

const likeSchema = Joi.object({
  id: Joi.string().required(),
  likedValue: Joi.boolean().required(),
});

export interface LikeMessageDTO {
  id: string;
  likedValue: boolean;
}

export default likeSchema;
