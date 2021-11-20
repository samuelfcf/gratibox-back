import faker from 'faker';
import connection from '../database/connection.js';
import { fakeUserSignUp } from './users.factory.js';

const fakePlan = {
  id: faker.datatype.number(),
  name: faker.name.findName()
};

const fakeSubscription = {
  planId: fakePlan.id,
  deliveryDay: faker.datatype.string(),
  deliveryCEP: '12345678',
  deliveryNumber: faker.datatype.string(),
  productsIds: '[1]'
};

const wrongFakeSubscription = {
  planId: fakePlan.id,
  deliveryDay: faker.datatype.string(),
  deliveryCEP: '12345678',
  deliveryNumber: faker.datatype.string(),
  productsIds: 0
};

const fakeProduct = {
  id: 1,
  name: 'Product,'
};

const createFakeProducts = async () =>
  connection.query('INSERT INTO products (id, name) VALUES ($1, $2);', [
    fakeProduct.id,
    fakeProduct.name
  ]);

const createFakeSubscribeProducts = async () =>
  connection.query(
    'INSERT INTO subscribes_products (subscribe_id, product_id) VALUES ($1, $2);',
    [fakeSubscription.planId, fakeProduct.id]
  );

const createFakePlan = async () =>
  connection.query('INSERT INTO plans (id, name) VALUES ($1, $2);', [
    fakePlan.id,
    fakePlan.name
  ]);

const createFakeSubscription = async () =>
  connection.query(
    'INSERT INTO subscribes (user_id, plan, delivery_day, delivery_cep, delivery_number) VALUES ($1, $2, $3, $4, $5, $6);',
    [
      fakeUserSignUp.id,
      fakeSubscription.planId,
      fakeSubscription.deliveryDay,
      fakeSubscription.deliveryCEP,
      fakeSubscription.deliveryNumber,
      fakeSubscription.productsIds
    ]
  );

const deleteSubscriptions = async () =>
  connection.query('DELETE FROM subscribes;');

const deletePlans = async () => connection.query('DELETE FROM plans;');
const deleteProducts = async () => connection.query('DELETE FROM products;');
const deleteSubscribeProducts = async () =>
  connection.query('DELETE FROM subscribes_products;');

export {
  fakeSubscription,
  wrongFakeSubscription,
  createFakeSubscribeProducts,
  deleteSubscribeProducts,
  deleteSubscriptions,
  createFakePlan,
  deletePlans,
  createFakeSubscription,
  createFakeProducts,
  deleteProducts
};
