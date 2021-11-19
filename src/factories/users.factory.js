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
const deleteUsers = async () => connection.query('DELETE FROM users;');
const deleteSessions = async () => connection.query('DELETE FROM sessions;');

export {
  fakeUserSignUp,
  invalidFakeUserSignUp,
  fakeUserSignIn,
  wrongFakeUserSignIn,
  invalidFakeUserSignIn,
  createUser,
  deleteUsers,
  deleteSessions
};
