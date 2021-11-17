import { Router } from 'express';
const router = Router();

router.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to Gratibox API!',
  });
});

export default router;
