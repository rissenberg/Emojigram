import express from 'express';
import bodyParser from 'body-parser';
import {ChatsAPI} from "./api/api_chats";
import {
	API_PATH_PREFIX,
	SERVER_PORT
} from "./config/config";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API handlers declaration
const chatsAPI = new ChatsAPI();

// Chat Service handlers
app.get(`${API_PATH_PREFIX}/chats`, chatsAPI.getUsersChatsList);
app.get(`${API_PATH_PREFIX}/chats/:id`, chatsAPI.getChatByID);
app.post(`${API_PATH_PREFIX}/chats`, chatsAPI.createChat);

app.use('*', (req, res) => {
	return res.status(404).json('404 Path Not Found');
});

app.listen(SERVER_PORT, () => console.log(`Server listening port ${SERVER_PORT}`));