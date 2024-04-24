import { createSlice } from '@reduxjs/toolkit';
import { IChatsStorage } from '../../model/types';

// TODO MockData
const initialState: IChatsStorage = {
	chats: [
		{
			chat: {
				id: 1,
				avatar: '#4b8bc0',
				name: 'Rock Club',
				users: [],
			},
			messages: [
				{
					id: 3,
					author: {
						id: 3,
						avatar: '#e44b81',
						nickname: 'Sash Bash',
						email: '@',
						deleted: false
					},
					content: 'You`re welcome, Yana!',
					send_date: '20:34',
				},
				{
					id: 2,
					author: {
						id: 2,
						avatar: '#4b98e4',
						nickname: 'Egor',
						email: '@',
						deleted: false
					},
					content: 'Hello, Yana, nice to meet you',
					send_date: '20:34',
				},
				{
					id: 1,
					author: {
						id: 1,
						avatar: '#e4b44b',
						nickname: 'Yanka',
						email: '@',
						deleted: false
					},
					content: 'Hello! My name is Yana',
					send_date: '20:32',
				},
			],
		},
		{
			chat: {
				id: 2,
				avatar: '#ddac52',
				name: 'Angedonia',
				users: [],
			},
			messages: [
				{
					id: 4,
					author: {
						id: 1,
						avatar: '#e4b44b',
						nickname: 'Yanka',
						email: '@',
						deleted: false
					},
					content: 'Короткая спичка - судьба возвращаться на Родину\n' +
						'По первому снегу, по рыжей крови на тропе.\n' +
						'Жрать хвою прошлогоднюю горькую, горькую, горькую.\n' +
						'На сбитый затылками лед насыпать золотые пески\n' +
						'Святые пустые места - это в небо с моста,\n' +
						'Это давка на транспорт, по горло забитый тоской.\n' +
						'Изначальный конец, голова не пролазит в стакан.\n' +
						'А в восемь утра кровь из пальца - анализ для граждан.\n' +
						'Осевшая грязь, допустимый процент для работ.\n' +
						'Сырой "Беломор", елки-палки, дырявые валенки,\n' +
						'Ножи в голенищах и мелочь звенит, звенит, звенит.\n' +
						'А слепой у окна сочиняет небесный мотив.\n' +
						'Счастливый слепой учит птичку под скрипочку петь.\n' +
						'Узаконенный вор, попроси - он ключи оставляет в залог.\n' +
						'Ангедония - диагноз отсутствия радости.\n' +
						'Антивоенная армия, антипожарный огонь.\n' +
						'Сатанеющий третьеклассник, во взрослой пилотке со звездочкой\n' +
						'Повесил щенка - подрастает надежный солдат.\n' +
						'А слабо переставить местами забвенье и боль?\n' +
						'Слабо до утра заблудиться в лесу и заснуть?\n' +
						'Забинтованный кайф, заболоченный микрорайон.\n' +
						'Рассыпать живые цветы по холодному кафелю.\n' +
						'Убили меня - значит надо выдумывать месть.\n' +
						'История любит героев, история ждет тебя.\n' +
						'За каждым углом с верным средством от всех неудач.\n' +
						'Как бы так за столом при свечах рассказать про любовь.\n' +
						'Как бы взять так и вспомнить, что нужно прощенья просить.\n' +
						'Православная пыль, ориентиры на свет - соляные столбы.\n' +
						'Жрать хвою прошлогоднюю горькую, горькую, горькую...\n' +
						'Ангедония. Ангедония.',
					send_date: '15:48',
				},
			],
		},
		{
			chat: {
				id: 3,
				avatar: '#5bc04b',
				name: 'Empty chat',
				users: [],
			},
			messages: [],
		},
	],
};

const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		addChat: (state, action) => {
			state.chats.push(action.payload);
		},
	},
});

export const { addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
