import faker from 'faker';
import connection from '../database/connection.js';

const fakeUserSignUp = {
  id: faker.datatype.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

const invalidFakeUserSignUp = {
  name: faker.name.findName()
};

const fakeUserSignIn = {
  email: fakeUserSignUp.email,
  password: fakeUserSignUp.password
};

const wrongFakeUserSignIn = {
  email: faker.internet.email(),
  password: 'senha errada'
};

const fakeSession = {
  id: faker.datatype.number(),
  user_id: fakeUserSignUp.id,
  token: faker.datatype.uuid()
};

const invalidFakeUserSignIn = {
  email: fakeUserSignUp.email
};

const createUser = async () =>
  connection.query(
    'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4);',
    [
      fakeUserSignUp.id,
      fakeUserSignUp.name,
      fakeUserSignUp.email,
      fakeUserSignUp.password
    ]
  );

const createSession = async () =>
  connection.query(
    'INSERT INTO sessions (id, user_id, token) VALUES ($1, $2, $3);',
    [fakeSession.id, fakeSession.user_id, fakeSession.token]
  );
const deleteUsers = async () => connection.query('DELETE FROM users;');
const deleteSessions = async () => connection.query('DELETE FROM sessions;');

export {
  fakeUserSignUp,
  fakeSession,
  invalidFakeUserSignUp,
  fakeUserSignIn,
  wrongFakeUserSignIn,
  invalidFakeUserSignIn,
  createUser,
  createSession,
  deleteUsers,
  deleteSessions
};
