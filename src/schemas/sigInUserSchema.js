import joi from 'joi';

const signInUserSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: joi.string().min(8).required(),
});

export default signInUserSchema;
