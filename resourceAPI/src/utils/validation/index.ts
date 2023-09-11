import Joi from "joi";

export const UserSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(30).required(),

  firstName: Joi.string().required(),

  lastName: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),
  
  gender: Joi.string().required(),

  birth_year: Joi.number().integer().max(2005),
}).with("password", "repeat_password");