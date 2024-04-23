import cls from './style.module.scss';
import EmojiPicker from 'emoji-picker-react';
import { Theme, EmojiClickData } from 'emoji-picker-react';
import { useState } from 'react';

export const SendMessageBar = () => {
	const [showEmoMenu, setShowEmoMenu] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');

	const toggleEmoMenu = () => {
		setShowEmoMenu(prev => !prev);
	};

	const addEmoToInput = (emo: EmojiClickData) => {
		setInputValue(prev => prev + emo.emoji);
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
					// open={showEmoMenu}
				/>
			</div>
			<input className={cls.input} value={inputValue} readOnly={true}/>
			<button className={cls.btn}>
        SEND
			</button>
		</div>
	);
};
