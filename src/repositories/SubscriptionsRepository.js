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
    const result = await connection.query(
      'SELECT * FROM subscribes WHERE user_id = $1;',
      [userId]
    );
    await connection.query(
      'UPDATE users SET is_subscriber = true WHERE id = $1;',
      [userId]
    );
    return result.rows[0];
  }

  async checkSubscriptionExistsByUserId({ userId }) {
    const result = await connection.query(
      'SELECT * FROM subscribes WHERE user_id = $1;',
      [userId]
    );
    const subscriptionExists = result.rows[0];
    return subscriptionExists;
  }

  async addProductsToUserSubscription({ subscriptionId, productsIds }) {
    productsIds.forEach(async (p) => {
      await connection.query(
        'INSERT INTO subscribes_products (subscribe_id, product_id) VALUES ($1, $2);',
        [subscriptionId, p]
      );
    });
  }

  async getSubscribeInfos({ userId }) {
    const result = await connection.query(
      `
      SELECT 
      subscribes.*,
      products.name AS product_name
      FROM subscribes
        JOIN subscribes_products
          ON subscribes_products.subscribe_id = subscribes.id
        JOIN products
          ON products.id = subscribes_products.product_id
      WHERE subscribes.user_id = $1;
    `,
      [userId]
    );

    const subscriptionInfo = result.rows;
    return subscriptionInfo;
  }
}

export default SubscriptionsRepository;
