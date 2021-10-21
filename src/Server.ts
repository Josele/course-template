import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';

import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';
import { cookieProps } from '@shared/constants';
import { fillRightMenu, fillMainMenu } from './middlewares/templateEngFiller';

const app = express(); 
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
		error: err.message,
	});
});



/************************************************************************************
 *								Serve front-end content
 ***********************************************************************************/

// view engine setup
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
app.set('view engine', 'ejs');
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// default resource 

app.use('/',[fillRightMenu, fillMainMenu]); //Note that use applies to all routes with
//that prefix
app.get('/', (req: Request, res: Response) => {
	res.render('partials/layout', {root: viewsDir, column2body: "../pages/index.html" });
});
app.get('/index', (req: Request, res: Response) => {
	res.redirect('/');
	
});

// login resource
app.get('/login', (req: Request, res: Response) => {
	res.render('partials/layout', {root: viewsDir, column2body: "../pages/login.html" });
//	  res.sendFile('login.html', {root: viewsDir});
});

// all users resource
app.get('/users', (req: Request, res: Response) => {
	const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
	    res.redirect('/');
    } else {
        res.render('partials/layout', {root: viewsDir, column2body: "../pages/users.html" });
    }
});

// user profile resource
app.get('/profile', (req: Request, res: Response) => {
    const jwt = req.signedCookies[cookieProps.key];
    if (!jwt) {
        res.redirect('/');
    } else {
		res.render('partials/layout', {root: viewsDir, column2body: "../pages/profile.html" });
    }
});

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
