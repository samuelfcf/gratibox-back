import createSubscriptionSchema from '../schemas/createSubscriptionSchema.js';
import CreateSubscriptionService from '../services/CreateSubscriptionService.js';

class CreateSubscriptionController {
  async handle(req, res) {
    const { userId } = req.params;
    const { planId, deliveryDay, deliveryCEP, deliveryNumber } = req.body;

    try {
      const { error } = createSubscriptionSchema.validate({
        userId,
        planId,
        deliveryDay,
        deliveryCEP,
        deliveryNumber
      });

      if (error) {
        return res.sendStatus(400);
      }

      const createSubscriptionService = new CreateSubscriptionService();
      await createSubscriptionService.execute({
        userId,
        planId,
        deliveryDay,
        deliveryCEP,
        deliveryNumber
      });

      return res.sendStatus(201);
    } catch (err) {
      if (err.message.includes('already')) {
        return res.status(409).send({
          message: err.message
        });
      }

      return res.status(500).send({
        message: `Can't create subscription. Error: ${err.message}`
      });
    }
  }
}

export default new CreateSubscriptionController();
