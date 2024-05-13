import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger';
import {
	ALLOWED_ORIGINS,
	API_PATH_PREFIX,
	SERVER_PORT
} from './config/config';
import { ChatsAPI } from './api/api_chats';
import { UsersAPI } from './api/api_users';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: ALLOWED_ORIGINS,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	preflightContinue: false,
	optionsSuccessStatus: 204
}));

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API handlers declaration
const chatsAPI = new ChatsAPI();
const usersAPI = new UsersAPI();

// Chat Service handlers
app.get(`${API_PATH_PREFIX}/chats`, chatsAPI.getUsersChatsList);
app.get(`${API_PATH_PREFIX}/chats/:id`, chatsAPI.getChatByID);
app.post(`${API_PATH_PREFIX}/chats`, chatsAPI.createChat);

// User Service handlers
app.get(`${API_PATH_PREFIX}/users/:id`, usersAPI.getUserByID);

app.use('*', (req, res) => {
	return res.status(404).json('404 Path Not Found');
});

app.listen(SERVER_PORT, () => console.log(`Server listening port ${SERVER_PORT}`));