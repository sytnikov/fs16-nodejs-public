import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  categoryId: Joi.number().required(),
  images: Joi.array().items(Joi.string().required()).required(),
});
