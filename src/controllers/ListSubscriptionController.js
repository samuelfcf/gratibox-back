import ListSubscriptionService from '../services/ListSubscriptionService.js';

class ListSubscriptionController {
  async handle(req, res) {
    const { userId } = req.params;

    try {
      const listSubscriptionService = new ListSubscriptionService();
      const subscriptionInfo = await listSubscriptionService.execute({
        userId
      });

      return res.status(200).send(subscriptionInfo);
    } catch (err) {
      if (err.message.includes('not exists!')) {
        return res.status(404).send({
          message: err.message
        });
      }

      return res.status(500).send({
        message: `Can't get subscription infos. Eror: ${err.message}`
      });
    }
  }
}

export default new ListSubscriptionController();
