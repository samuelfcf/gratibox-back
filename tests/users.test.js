import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection.js';
import * as F from '../src/factories/users.factory.js';

afterAll(async () => {
  await F.deleteUsers();
  connection.end();
});

describe('POST /sign-up', () => {
  test('returns 201 for create user successfull', async () => {
    const result = await supertest(app).post('/sign-up').send(F.fakeUserSignUp);
    expect(result.status).toEqual(201);
  });
});