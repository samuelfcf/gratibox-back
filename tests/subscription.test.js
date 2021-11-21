import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection.js';
import * as F from '../src/factories/subscribe.factory.js';
import {
  deleteUsers,
  fakeUserSignUp,
  fakeSession,
  createUser,
  createSession,
  deleteSessions
} from '../src/factories/users.factory.js';

afterAll(async () => {
  await F.deleteSubscribeProducts();
  await F.deleteSubscriptions();
  await F.deleteProducts();
  await F.deletePlans();
  await deleteSessions();
  await deleteUsers();
  connection.end();
});

describe('POST /sub/:userId', () => {
  beforeAll(async () => {
    await createUser();
    await createSession();
    await F.createFakeProducts();
    await F.createFakePlan();
  });

  test('returns 201 for subscribe succesfull', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscriptionBody)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(201);
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.wrongFakeSubscription)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(400);
  });

  test('returns 409 for subscription already exists', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscriptionBody)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(409);
  });

  test('returns 401 for user not authorized', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscriptionBody);
    expect(result.status).toEqual(401);
  });
});

describe('GET /sub/:userId', () => {
  beforeAll(async () => {
    await F.createFakeSubscription();
  });

  test('returns 200 for request successfull', async () => {
    const result = await supertest(app)
      .get(`/sub/${fakeUserSignUp.id}`)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('subscription_date');
  });

  test('returns 401 for not user not authorized', async () => {
    const result = await supertest(app).get(`/sub/${fakeUserSignUp.id}`);
    expect(result.status).toEqual(401);
  });

  test('returns 404 for subscription not exists', async () => {
    await F.deleteSubscribeProducts();
    await F.deleteSubscriptions();
    const result = await supertest(app)
      .get(`/sub/${fakeUserSignUp.id}`)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(404);
  });
});
