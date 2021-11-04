import * as Joi from 'joi';

export const profileValidation = Joi.object({
  user: Joi.string().length(24),
  company: Joi.string().max(50).required(),
  website: Joi.string().max(50).required(),
  location: Joi.string().max(50).required(),
  status: Joi.string().min(5).required(),
  skills: Joi.string().min(5).required(),
  bio: Joi.string().min(5).required(),
  githubusername: Joi.string().min(5).required(),
  experience: Joi.array().items(
    Joi.object().keys({
      title: Joi.string().min(5).required(),
      company: Joi.string().min(5).required(),
      location: Joi.string().min(5),
      from: Joi.date(),
      to: Joi.date(),
      current: Joi.boolean(),
      description: Joi.string().min(5),
    }),
  ),
  education: Joi.array().items(
    Joi.object().keys({
      school: Joi.string().min(5).required(),
      degree: Joi.string().min(5).required(),
      fieldofstudy: Joi.string().min(5).required(),
      from: Joi.date().required(),
      to: Joi.date(),
      current: Joi.boolean(),
      description: Joi.string().min(5),
    }),
  ),
  youtube: Joi.string().min(5),
  twitter: Joi.string().min(5),
  facebook: Joi.string().min(5),
  linkedin: Joi.string().min(5),
  instagram: Joi.string().min(5),
});
