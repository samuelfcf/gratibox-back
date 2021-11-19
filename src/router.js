import { Router } from 'express';
import userRouter from './routes/user.routes.js';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to Gratibox API!',
  });
});

router.use('/', userRouter);

export default router;
