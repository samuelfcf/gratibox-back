import { Router } from 'express';
import userRouter from './routes/user.routes.js';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to Gratibox API!',
  });
});

router.use('/sign-up', userRouter);

export default router;
