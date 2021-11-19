import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/connection.js';
import * as F from '../src/factories/users.factory.js';

afterAll(async () => {
  await F.deleteSessions();
  await F.deleteUsers();
  connection.end();
});

describe('POST /sign-up', () => {
  test('returns 201 for create user successfull', async () => {
    const result = await supertest(app).post('/sign-up').send(F.fakeUserSignUp);
    expect(result.status).toEqual(201);
  });

  test('returns 409 for user already exists', async () => {
    const result = await supertest(app).post('/sign-up').send(F.fakeUserSignUp);
    expect(result.status).toEqual(409);
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app)
      .post('/sign-up')
      .send(F.invalidFakeUserSignUp);
    expect(result.status).toEqual(400);
  });
});

describe('POST /sign-in', () => {
  test('returns 200 for login succesfull', async () => {
    const result = await supertest(app).post('/sign-in').send(F.fakeUserSignIn);
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('token');
  });

  test('returns 401 for incorrect credentials', async () => {
    const result = await supertest(app).post('/sign-in').send(F.wrongFakeUserSignIn);
    expect(result.status).toEqual(401);
  });

  test('returns 400 for invalid body', async () => {
    const result = await supertest(app).post('/sign-in').send(F.invalidFakeUserSignIn);
    expect(result.status).toEqual(400);
  })
})
