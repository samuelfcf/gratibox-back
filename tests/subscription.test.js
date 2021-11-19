import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection.js';
import * as F from '../src/factories/subscribe.factory.js';
import {
  deleteUsers,
  fakeUserSignUp,
  createUser
} from '../src/factories/users.factory.js';

afterAll(async () => {
  await F.deleteSubscriptions();
  await F.deletePlans();
  await deleteUsers();
  connection.end();
});

describe('POST /sub/:userId', () => {
  beforeAll(async () => {
    await createUser();
    await F.createFakePlan();
  });

  test('returns 201 for subscribe succesfull', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscription);
    expect(result.status).toEqual(201);
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send({});
    expect(result.status).toEqual(400);
  });

  test('returns 409 for subscription already exists', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscription);
    expect(result.status).toEqual(409);
  });
});
