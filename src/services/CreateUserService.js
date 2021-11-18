import { hashSync } from 'bcrypt';
import UserRepository from '../repositories/UsersRepository.js';

class CreateUserService {
  async execute({ name, email, password }) {
    const userRepository = new UserRepository();

    const userExists = await userRepository.checkUserExists({ email });
    if (userExists) {
      throw new Error('User already exists!');
    }

    const hashPassword = hashSync(password, 10);

    const user = await userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
