import { IChatsDB, IMessagesDB, IUsersDB } from './types';

const chats = new Map<number, IChatsDB>()
	.set(1, {
		_id: 1,
		avatar_url: '#4b8bc0',
		name: 'Rock Club',
		created: new Date('12.04.24 12:48'),
		deleted: false,
		user_ids: [
			{
				id: 'Yanka',
				role: 'default',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			},
			{
				id: 'Egor',
				role: 'admin',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			},
			{
				id: 'Sash_Bash',
				role: 'default',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			},
		]
	})
	.set(2, {
		_id: 2,
		avatar_url: '#ddac52',
		name: 'Pesenka chudesenka',
		created: new Date('12.04.24 12:48'),
		deleted: false,
		user_ids: [
			{
				id: 'Yanka',
				role: 'admin',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			},
			{
				id: 'Egor',
				role: 'default',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			},
		]
	})
	.set(3, {
		_id: 3,
		avatar_url: '#5bc04b',
		name: 'Empty chat',
		created: new Date('12.04.24 12:48'),
		deleted: false,
		user_ids: [
			{
				id: 'Yanka',
				role: 'admin',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			}
		]
	})
	.set(4, {
		_id: 4,
		avatar_url: '#5bc04b',
		name: 'Deleted chat',
		created: new Date('12.04.24 12:48'),
		deleted: true,
		user_ids: [
			{
				id: 'Yanka',
				role: 'admin',
				joined_at: new Date('12.04.24 12:48'),
				removed: false,
			}
		]
	});

const users = new Map<string, IUsersDB>()
	.set('Yanka', {
		_id: 'Yanka',
		email: 'yanka@mail.com',
		password: 'password',
		created: new Date('12.04.24 12:48'),
		avatar_url: '#e4b44b',
		deleted: false,
		chat_ids: [1, 2, 3, 4]
	})
	.set('Egor', {
		_id: 'Egor',
		email: 'egor@mail.com',
		password: 'password',
		created: new Date('12.04.24 12:48'),
		avatar_url: '#4b98e4',
		deleted: false,
		chat_ids: [1, 2]
	})
	.set('Sash_Bash', {
		_id: 'Sash_Bash',
		email: 'bashlachev@mail.com',
		password: 'password',
		created: new Date('12.04.24 12:48'),
		avatar_url: '#e44b81',
		deleted: false,
		chat_ids: [1]
	});


const messages = new Map<number, IMessagesDB>()
	.set(1, {
		_id: 1,
		sender_id: 'Yanka',
		receiver_id: 1,
		sent_at: new Date('12.04.24 12:52'),
		content: 'Hello! My name is Yana',
		deleted: false,
	})
	.set(2, {
		_id: 1,
		sender_id: 'Egor',
		receiver_id: 1,
		sent_at: new Date('12.04.24 12:54'),
		content: 'Hello, Yana, nice to meet you',
		deleted: false,
	})
	.set(3, {
		_id: 3,
		sender_id: 'Sash_Bash',
		receiver_id: 1,
		sent_at: new Date('12.04.24 12:55'),
		content: 'You`re welcome, Yana!',
		deleted: false,
	})
	.set(4, {
		_id: 4,
		sender_id: 'Egor',
		receiver_id: 2,
		sent_at: new Date('12.04.24 12:55'),
		content: 'ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ ПОД ЗЕМЛЮ! СКОК НА ОБЛАКО! ПРЫГ ПОД ЗЕМЛЮ! СКОК НА ОБЛАКО! НАД ДЕРЕВЬЯМИ! ПОД МОГИЛАМИ! НИЖЕ КЛАДБИЩА! ВЫШЕ СОЛНЫШКА! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ПРЫГ! СКОК! ',
		deleted: false,
	})
	.set(5, {
		_id: 5,
		sender_id: 'Yanka',
		receiver_id: 1,
		sent_at: new Date('12.04.24 12:55'),
		content: 'This message is deleted',
		deleted: true,
	});

export const DB_MOCK = {
	users,
	chats,
	messages,
};
