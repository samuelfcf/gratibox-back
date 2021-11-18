import createUserSchema from '../schemas/createUserSchema.js';
import CreateUserService from '../services/CreateUserService.js';

class CreateUserController {
  async handle(req, res) {
    const { name, email, password } = req.body;

    try {
      const { error } = createUserSchema.validate({ name, email, password });

      if (error) {
        return res.sendStatus(400);
      }

      const createUserService = new CreateUserService();
      await createUserService.execute({
        name,
        email,
        password,
      });

      return res.sendStatus(201);
    } catch (err) {
      if (err.message.includes('already')) {
        return res.status(409).send({
          message: err.message,
        });
      }

      return res.status(500).send({
        message: `Can't create user. Error: ${err.message}`,
      });
    }
  }
}

export default new CreateUserController();
