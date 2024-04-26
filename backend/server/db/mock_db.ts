import { IChatsDB, IMessagesDB, IUsersChatsDB, IUsersDB } from './types';

const chats: IChatsDB[] = [
	{
		id: 1,
		avatar: '#4b8bc0',
		name: 'Rock Club',
		type: 'group',
		created_at: new Date('12.04.24 12:48'),
	},
	{
		id: 2,
		avatar: '#ddac52',
		name: 'Pesenka chudesenka',
		type: 'group',
		created_at: new Date('12.04.24 12:48'),
	},
	{
		id: 3,
		avatar: '#5bc04b',
		name: 'Empty chat',
		type: 'group',
		created_at: new Date('12.04.24 12:48'),
	},
];

const users: IUsersDB[] = [
	{
		id: 1,
		avatar: '#e4b44b',
		username: 'Yanka',
		email: 'yanka@mail.com',
		password: 'password',
		created_at: new Date('12.04.24 12:48'),
	},
	{
		id: 2,
		avatar: '#4b98e4',
		username: 'Egor',
		email: 'egor@mail.com',
		password: 'password',
		created_at: new Date('12.04.24 12:48'),
	},
	{
		id: 3,
		avatar: '#e44b81',
		username: 'Sash_Bash',
		email: 'bashlachev@mail.com',
		password: 'password',
		created_at: new Date('12.04.24 12:48'),
	},
];

const users_chats: IUsersChatsDB[] = [
	{
		id: 1,
		user_id: 1,
		chat_id: 1,
		role: 'default',
		joined_at: new Date('12.04.24 12:48'),
	},
	{
		id: 2,
		user_id: 2,
		chat_id: 1,
		role: 'admin',
		joined_at: new Date('12.04.24 12:48'),
	},
	{
		id: 3,
		user_id: 1,
		chat_id: 1,
		role: 'default',
		joined_at: new Date('12.04.24 12:48'),
	},
	{
		id: 4,
		user_id: 1,
		chat_id: 2,
		role: 'default',
		joined_at: new Date('12.04.24 12:48'),
	},
	{
		id: 5,
		user_id: 2,
		chat_id: 2,
		role: 'default',
		joined_at: new Date('12.04.24 12:48'),
	},
	{
		id: 6,
		user_id: 1,
		chat_id: 3,
		role: 'default',
		joined_at: new Date('12.04.24 12:48'),
	},
];

const messages: IMessagesDB[] = [
	{
		id: 1,
		author_id: 1,
		chat_id: 1,
		content: 'Hello! My name is Yana',
		sent_at:  new Date('12.04.24 12:52'),
	},
	{
		id: 2,
		author_id: 2,
		chat_id: 1,
		content: 'Hello, Yana, nice to meet you',
		sent_at:  new Date('12.04.24 12:54'),
	},
	{
		id: 3,
		author_id: 3,
		chat_id: 1,
		content: 'You`re welcome, Yana!',
		sent_at:  new Date('12.04.24 12:55'),
	},
	{
		id: 4,
		author_id: 2,
		chat_id: 2,
		content: 'ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ ПОД ЗЕМЛЮ! СКОК НА ОБЛАКО! ПРЫГ ПОД ЗЕМЛЮ! СКОК НА ОБЛАКО! НАД ДЕРЕВЬЯМИ! ПОД МОГИЛАМИ! НИЖЕ КЛАДБИЩА! ВЫШЕ СОЛНЫШКА! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ',
		sent_at:  new Date('12.04.24 12:55'),
	},
];

export const DB_MOCK = {
	users,
	chats,
	users_chats,
	messages,
};
