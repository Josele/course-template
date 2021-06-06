import { Router } from 'express';
import { adminMW } from './middleware';
import AuthController  from '../controllers/AuthController';
import UserController  from '../controllers/UserController';


// Auth router
const authRouter = Router();
authRouter.post('/login', AuthController.login);
authRouter.get('/logout', AuthController.logout);


// User-router
const userRouter = Router();
userRouter.get('/all', UserController.getAllUsers);
userRouter.post('/add', UserController.addOneUser);
userRouter.put('/update', UserController.updateOneUser);
userRouter.delete('/delete/:id', UserController.deleteOneUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
baseRouter.use('/users', adminMW, userRouter);
export default baseRouter;
