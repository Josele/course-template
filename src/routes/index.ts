import { Router } from 'express';
import { userMW , adminMW } from '../middlewares/checkRoles';
import AuthController  from '../controllers/AuthController';
import UserController  from '../controllers/UserController';
import ProfileController  from '../controllers/ProfileController';


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

// Profile-router
const profileRouter = Router();
profileRouter.get('/all', ProfileController.getUser);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
// routes that require login
baseRouter.use('/users', adminMW, userRouter);
baseRouter.use('/profile', userMW, profileRouter);
export default baseRouter;
