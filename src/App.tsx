import { useState } from 'react';
import { EmojiButton } from './components/EmogiButton/EmojiButton';
import { EmojiBox } from './components/EmojiBox/EmojiBox';
import { CSSTransition } from 'react-transition-group';

export const App = () => {
  const [text, setText] = useState<string>('');
  const [isEmojiBoxOpened, setEmojiBoxOpened] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <div className="input">
        <div
          className="input__field"
          role="textbox"
          placeholder="Ваше сообщение"
          aria-multiline="true"
          contentEditable="true"
          suppressContentEditableWarning={true}
          onChange={handleChange}
          tabIndex={0}
        >
          {text}
        </div>
        <EmojiButton onClick={() => setEmojiBoxOpened(!isEmojiBoxOpened)} />
        <CSSTransition in={isEmojiBoxOpened} timeout={200} classNames="emoji-box" unmountOnExit>
          <EmojiBox />
        </CSSTransition>
      </div>
    </div>
  );
};
