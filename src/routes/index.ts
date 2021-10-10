import { Router } from 'express';
import { checkJwt , adminMW, checkRole } from '../middlewares/checkRoles';
import AuthController  from '../controllers/AuthController';
import UserController  from '../controllers/UserController';
import ProfileController  from '../controllers/ProfileController';
import { UserRoles } from '@entities/User';


// Building routs 
// Here we build the routes but we don't accept until registered
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

// Registering routes
// Here we register routes and assign middleware to them
// Export the base-router
const baseRouter = Router();
baseRouter.use('/auth', authRouter);
// routes that require login
baseRouter.use('/users', [checkJwt, checkRole(UserRoles.Admin)], userRouter); //we require admin rights too
baseRouter.use('/profile', checkJwt, profileRouter);
export default baseRouter;
