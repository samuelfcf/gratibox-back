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
  deliveryNumber: faker.datatype.number()
};

const createFakePlan = async () =>
  connection.query('INSERT INTO plans (id, name) VALUES ($1, $2);', [
    fakePlan.id,
    fakePlan.name
  ]);

const deletePlans = async () => connection.query('DELETE FROM plans;');

const createFakeSubscription = async () =>
  connection.query(
    'INSERT INTO subscribes (user_id, plan, delivery_day, delivery_cep, delivery_number) VALUES ($1, $2, $3, $4, $5);',
    [
      fakeUserSignUp.id,
      fakeSubscription.planId,
      fakeSubscription.deliveryDay,
      fakeSubscription.deliveryCEP,
      fakeSubscription.deliveryNumber
    ]
  );

const deleteSubscriptions = async () =>
  connection.query('DELETE FROM subscribes;');

export {
  fakeSubscription,
  deleteSubscriptions,
  createFakePlan,
  deletePlans,
  createFakeSubscription
};
