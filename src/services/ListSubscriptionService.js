import SubscriptionsRepository from '../repositories/SubscriptionsRepository.js';

class ListSubscriptionService {
  async execute({ userId }) {
    const subscriptionRepository = new SubscriptionsRepository();

    const subscriptionExists =
      await subscriptionRepository.checkSubscriptionExistsByUserId({ userId });

    if (!subscriptionExists) {
      throw new Error('Subscription not exists!');
    }

    const subscription = await subscriptionRepository.getSubscribeInfos({
      userId
    });
    return subscription;
  }
}

export default ListSubscriptionService;
