import joi from 'joi';

const createSubscriptionSchema = joi.object({
  userId: joi.number().integer().positive().required(),
  planId: joi.number().integer().positive().required(),
  deliveryDay: joi.string().min(1).required(),
  deliveryCEP: joi
    .string()
    .length(8)
    .pattern(/^(0|[1-9][0-9]*)$/)
    .required(),
  deliveryNumber: joi.number().integer().positive().required()
});

export default createSubscriptionSchema;
