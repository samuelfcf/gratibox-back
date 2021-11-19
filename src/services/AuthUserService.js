import { compareSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import UserRepository from '../repositories/UsersRepository.js';

class AuthUserService {
  async execute({ email, password }) {
    const userRepository = new UserRepository();
    const userExists = await userRepository.checkUserExists({ email });

    if (!userExists) {
      throw new Error('Incorrect credentials');
    }

    const passwordMath = compareSync(password, userExists.password);
    if (!passwordMath) {
      throw new Error('Incorrect credentials');
    }

    const token = uuid();
    const { id } = userExists;
    await userRepository.createUserSession({ userId: id, token });

    return {
      user: userExists,
      token,
    };
  }
}

export default AuthUserService;
