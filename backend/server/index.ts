import express, { Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { expressjwt, UnauthorizedError, Request as JWTRequest } from 'express-jwt';
import {
	ALLOWED_ORIGINS,
	API_PATH_PREFIX, JWT_SECRET,
	SERVER_PORT
} from './config/config';
import { ChatsAPI } from './api/api_chats';
import { UsersAPI } from './api/api_users';
import { MessagesAPI } from './api/api_messages';
import { AuthAPI } from './api/api_auth';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
	origin: ALLOWED_ORIGINS,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204
}));

const jwtMiddleware = expressjwt({
	secret: JWT_SECRET,
	algorithms: ['HS256']
});

app.use(API_PATH_PREFIX, jwtMiddleware);
app.use((err: Error, req: JWTRequest, res: Response, next: NextFunction) => {
	if (err instanceof UnauthorizedError) {
		if (req.path === `${API_PATH_PREFIX}/auth/login` || req.path ===`${API_PATH_PREFIX}/auth/signup`)
			next();
		else
			res.status(401).send('Invalid or empty auth token');
	} else {
		next(err);
	}
});

// API handlers declaration
const authAPI = new AuthAPI();
const chatsAPI = new ChatsAPI();
const usersAPI = new UsersAPI();
const messagesAPI = new MessagesAPI();

// Auth Service handlers
app.post(`${API_PATH_PREFIX}/auth/login`, authAPI.login);
app.post(`${API_PATH_PREFIX}/auth/signup`, authAPI.signup);
app.post(`${API_PATH_PREFIX}/auth/refresh`, authAPI.refreshJWT);

// User Service handlers
app.get(`${API_PATH_PREFIX}/users/search/:username`, usersAPI.searchByUsername);
app.get(`${API_PATH_PREFIX}/users/:username`, usersAPI.getUserByID);

// Chat Service handlers
app.get(`${API_PATH_PREFIX}/chats`, chatsAPI.getUsersChatsList);
app.get(`${API_PATH_PREFIX}/chats/:id`, chatsAPI.getChatByID);
app.post(`${API_PATH_PREFIX}/chats`, chatsAPI.createChat);
app.post(`${API_PATH_PREFIX}/chats/:id/add`, chatsAPI.addToChat);
app.post(`${API_PATH_PREFIX}/chats/:id/remove`, chatsAPI.removeFromChat);

// Message Service handlers
app.post(`${API_PATH_PREFIX}/messages/send`, messagesAPI.sendMessage);

// Default 404 response
app.use('*', (req, res) => {
	return res.status(404).json('404 - API Path Not Found');
});

app.listen(SERVER_PORT, () => console.log(`Server listening port ${SERVER_PORT} \n`));
