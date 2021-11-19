import { Router } from 'express';
import AuthUserController from '../controllers/AuthUserController.js';
import CreateUserController from '../controllers/CreateUserController.js';

const userRouter = Router();

userRouter.post('/sign-up', CreateUserController.handle);
userRouter.post('/sign-in', AuthUserController.handle);

export default userRouter;
