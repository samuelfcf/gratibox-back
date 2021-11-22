import SubscriptionsRepository from '../repositories/SubscriptionsRepository.js';

class CreateSubscriptionService {
  async execute({
    userId,
    planId,
    deliveryDay,
    deliveryCEP,
    deliveryNumber,
    deliveryAddress,
    deliveryRecipient,
    productsIds
  }) {
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
      deliveryNumber,
      deliveryAddress,
      deliveryRecipient
    });

    await subscriptionRepository.addProductsToUserSubscription({
      subscriptionId: subscription.id,
      productsIds
    });

    return subscription;
  }
}

export default CreateSubscriptionService;
