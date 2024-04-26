import { Request, Response } from 'express';
import { DB_MOCK } from '../db/mock_db';

const DB = DB_MOCK;

export const getAllChatsHandler = (req: Request, res: Response) => {
	console.log(req.method, req.url);
	return res.status(200).json({
		chats: DB.chats
	});
};

export const createChatHandler = (req: Request, res: Response) => {
	console.log(req.method, req.url);
	try {
		DB.chats.push(req.body);
	}
	catch (err) {
		return res.status(400).json({ error: err });
	}
	return res.status(200).json({
		chats: DB.chats
	});
};