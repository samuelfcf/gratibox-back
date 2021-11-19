import SubscriptionsRepository from '../repositories/SubscriptionsRepository.js';

class CreateSubscriptionService {
  async execute({ userId, planId, deliveryDay, deliveryCEP, deliveryNumber }) {
    const subscriptionRepository = new SubscriptionsRepository();

    const subscriptionExists =
      await subscriptionRepository.checkSubscriptionExistsByUserId({ userId });

    if (subscriptionExists) {
      throw new Error('Subscription for this user already exists!');
    }

    const subscription = await subscriptionRepository.createSubscription({
      userId,
      planId,
      deliveryDay,
      deliveryCEP,
      deliveryNumber
    });

    return subscription;
  }
}

export default CreateSubscriptionService;
