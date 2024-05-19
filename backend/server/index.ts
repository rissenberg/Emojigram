import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
	API_PATH_PREFIX,
	SERVER_PORT
} from './config/config';
import { ChatsAPI } from './api/api_chats';
import { UsersAPI } from './api/api_users';
import { MessagesAPI } from './api/api_messages';


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
const messagesAPI = new MessagesAPI();

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
