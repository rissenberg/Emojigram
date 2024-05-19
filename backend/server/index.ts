import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
	API_PATH_PREFIX,
	SERVER_PORT
} from './config/config';
import { ChatsAPI } from './api/api_chats';
import { UsersAPI } from './api/api_users';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: ['http://localhost:3000'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204
}));

// API handlers declaration
const chatsAPI = new ChatsAPI();
const usersAPI = new UsersAPI();

// Chat Service handlers
app.get(`${API_PATH_PREFIX}/chats`, chatsAPI.getUsersChatsList);
app.get(`${API_PATH_PREFIX}/chats/:id`, chatsAPI.getChatByID);
app.post(`${API_PATH_PREFIX}/chats`, chatsAPI.createChat);
app.post(`${API_PATH_PREFIX}/chats/:id/add`, chatsAPI.addToChat);
app.post(`${API_PATH_PREFIX}/chats/:id/remove`, chatsAPI.removeFromChat);

// User Service handlers
app.get(`${API_PATH_PREFIX}/users/:id`, usersAPI.getUserByID);

app.use('*', (req, res) => {
	return res.status(404).json('404 Path Not Found');
});

app.listen(SERVER_PORT, () => console.log(`Server listening port ${SERVER_PORT} \n`));