import { Router } from 'express';
import CreateSubscriptionController from '../controllers/CreateSubscriptionController.js';
import ListSubscriptionController from '../controllers/ListSubscriptionController.js';

const subscriptionRouter = Router();

subscriptionRouter.post('/:userId', CreateSubscriptionController.handle);
subscriptionRouter.get('/:userId', ListSubscriptionController.handle);

export default subscriptionRouter;
