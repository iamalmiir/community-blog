import * as Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(25).required(),
}).with('email', 'password');

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(25).required(),
}).with('email', 'password');
