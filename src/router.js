import { Router } from 'express';
import ensureAuth from './middlewares/ensureAuth.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to Gratibox API!'
  });
});

router.use('/', userRouter);
router.use('/sub', ensureAuth, subscriptionRouter);

export default router;
