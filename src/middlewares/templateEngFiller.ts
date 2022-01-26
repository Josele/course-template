import cookieParser from 'cookie-parser';
import StatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { cookieProps } from '@shared/constants';

// Middleware to populate the right menu
export const fillRightMenu = async (req: Request, res: Response, next: NextFunction) => {
	//Get the signed cookie
	const jwt = req.signedCookies[cookieProps.key];
	
	var topRightMenus=[{name: 'menu', link: "/", class:""}];
	if (!jwt)
	{
		topRightMenus.push({ name: 'login', link: "/login", class:""});
		res.locals.topRightMenus = topRightMenus;
			next();
	}else
	{
		topRightMenus.push({ name: 'profile', link: "/profile", class:"" });
		topRightMenus.push({ name: 'logout', link: "#", class: "logout-btn"});
		res.locals.topRightMenus = topRightMenus;
		next();
	}
	
};
// Middleware to populate the main menu
export const fillMainMenu = async (req: Request, res: Response, next: NextFunction) => {
	//Get the signed cookie
	const jwt = req.signedCookies[cookieProps.key];
	var url = req.path;
	var page="";
	if ( url ==="/")
	{
		page="home";
	}else
	{
		page=url;
	}
	res.locals.page=page;
	var mainMenus=[{name: 'home', link: "/", selected:""}];
	if (!jwt)
	{
		mainMenus.push({ name: 'contact', link: "/", selected:""});
		res.locals.mainMenus = mainMenus;
			next();
	}else
	{
		mainMenus.push({ name: 'exercises', link: "/", selected:"" });
		mainMenus.push({ name: 'results', link: "/", selected: ""});
		mainMenus.push({ name: 'contact', link: "/", selected:""});
		res.locals.mainMenus = mainMenus;
		next();
	}
	
};
