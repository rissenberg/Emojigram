import express from 'express';
import { DB_MOCK } from './db/mock_db';
import { createChatHandler, getAllChatsHandler } from './api/api_chat';

const API_PATH_PREFIX = '/api/v1';
const PORT = 8080;

const app = express();
const DB = DB_MOCK;

app.get(`${API_PATH_PREFIX}/chats`, getAllChatsHandler);
app.post(`${API_PATH_PREFIX}/chats`, createChatHandler);

app.get('*', (req, res) => {
	console.log(req.method, req.url);
	return res.status(200).json('404 Path Not Found');
});

app.listen(PORT, () => console.log(`Server listening port ${PORT}`));