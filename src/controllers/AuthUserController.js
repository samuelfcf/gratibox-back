import signInUserSchema from '../schemas/sigInUserSchema.js';
import AuthUserService from '../services/AuthUserService.js';

class AuthUserController {
  async handle(req, res) {
    const { email, password } = req.body;

    try {
      const { error } = signInUserSchema.validate({ email, password });

      if (error) {
        return res.sendStatus(400);
      }

      const authUserService = new AuthUserService();
      const session = await authUserService.execute({
        email,
        password,
      });

      return res.status(200).send({
        token: session.token,
      });
    } catch (err) {
      if (err.message.includes('credentials')) {
        return res.status(401).send({
          message: err.message,
        });
      }
      return res.status(500).send({
        message: `SignIn failed. Error: ${err.message}`,
      });
    }
  }
}

export default new AuthUserController();
