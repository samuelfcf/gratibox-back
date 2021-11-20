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
      .send(F.fakeSubscription)
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
      .send(F.fakeSubscription)
      .set('Authorization', fakeSession.token);
    expect(result.status).toEqual(409);
  });

  test('returns 401 for user not authorized', async () => {
    const result = await supertest(app)
      .post(`/sub/${fakeUserSignUp.id}`)
      .send(F.fakeSubscription);
    expect(result.status).toEqual(401);
  });
});
