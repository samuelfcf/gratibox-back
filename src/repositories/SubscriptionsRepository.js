import connection from '../database/connection.js';

class SubscriptionsRepository {
  async createSubscription({
    userId,
    planId,
    deliveryDay,
    deliveryCEP,
    deliveryNumber
  }) {
    await connection.query(
      'INSERT INTO subscribes (user_id, plan, delivery_day, delivery_cep, delivery_number) VALUES ($1, $2, $3, $4, $5);',
      [userId, planId, deliveryDay, deliveryCEP, deliveryNumber]
    );
  }

  async checkSubscriptionExistsByUserId({ userId }) {
    const result = await connection.query(
      'SELECT * FROM subscribes WHERE user_id = $1;',
      [userId]
    );
    const subscriptionExists = result.rows[0];
    return subscriptionExists;
  }
}

export default SubscriptionsRepository;
