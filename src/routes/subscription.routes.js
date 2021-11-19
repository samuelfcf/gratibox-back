import { Router } from 'express';
import CreateSubscriptionController from '../controllers/CreateSubscriptionController.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/:userId', CreateSubscriptionController.handle);

export default subscriptionRouter;
