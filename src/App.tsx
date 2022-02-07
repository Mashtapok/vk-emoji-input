import { useRef, useState } from 'react';
import { EmojiButton } from './components/EmogiButton/EmojiButton';
import { EmojiBox } from './components/EmojiBox/EmojiBox';
import { CSSTransition } from 'react-transition-group';

export const App = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>('');
  const [isEmojiBoxOpened, setEmojiBoxOpened] = useState<boolean>(false);

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const onSelectEmoji = (emoji: string): void => {
    const element = textAreaRef.current;

    if (!element) return;

    const before = text.slice(0, element.selectionStart);
    const native = emoji;
    const after = text.slice(element.selectionStart);

    const newText = `${before}${native}${after}`;

    setText(newText);
    // setTextAreaCursor(before.length + native.length);
  };

  return (
    <div className="App">
      <div className="input">
        <textarea
          ref={textAreaRef}
          className="input__field"
          rows={1}
          wrap="hard"
          placeholder="Ваше сообщение"
          // role="textbox"
          // aria-multiline="true"
          // contentEditable="true"
          // suppressContentEditableWarning={true}
          onChange={handleChange}
          tabIndex={0}
          value={text}
        >
        </textarea>
        <EmojiButton onClick={() => setEmojiBoxOpened(!isEmojiBoxOpened)} />
        <CSSTransition in={isEmojiBoxOpened} timeout={200} classNames="emoji-box" unmountOnExit>
          <EmojiBox onSelectEmoji={onSelectEmoji} />
        </CSSTransition>
      </div>
    </div>
  );
};
