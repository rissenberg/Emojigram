import cls from './style.module.scss';
import EmojiPicker from 'emoji-picker-react';
import { Theme, EmojiClickData } from 'emoji-picker-react';
import React, { useState } from 'react';

export const SendMessageBar = () => {
	const [showEmoMenu, setShowEmoMenu] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const toggleEmoMenu = () => {
		setShowEmoMenu(prev => !prev);
	};

	const addEmoToInput = (emo: EmojiClickData) => {
		setInputValue(prev => prev + emo.emoji);
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	return (
		<div className={cls.sendBar}>
			<button className={cls.btn} onClick={toggleEmoMenu}>
        EMO
			</button>
			<div className={`${cls.emoMenu} ${!showEmoMenu && cls.emoMenu__hide}`}>
				<EmojiPicker
					theme={Theme.DARK}
					onEmojiClick={addEmoToInput}
				/>
			</div>
			<input className={cls.input} value={inputValue} onInput={handleInput}/>
			<button className={cls.btn}>
        SEND
			</button>
		</div>
	);
};
