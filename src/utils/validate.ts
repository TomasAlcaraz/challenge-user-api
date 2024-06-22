import Joi from "joi";

export const validateUser = (user: any, isUpdate = false) => {
  const schema = Joi.object({
    name: isUpdate ? Joi.string().optional() : Joi.string().required(),
    email: isUpdate
      ? Joi.string().email().optional()
      : Joi.string().email().required(),
    password: isUpdate
      ? Joi.string().min(8).optional()
      : Joi.string().min(8).required(),
  });

  return schema.validate(user);
};
