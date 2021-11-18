import connection from '../database/connection.js';

class UserRepository {
  async createUser({ name, email, password }) {
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
      [name, email, password],
    );
  }

  async checkUserExists({ email }) {
    const result = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email],
    );
    const userExists = result.rows[0];
    return userExists;
  }
}

export default UserRepository;
