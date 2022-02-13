import { useEffect, useRef, useState } from 'react';
import { EmojiButton } from './components/EmogiButton/EmojiButton';
import { EmojiBox } from './components/EmojiBox/EmojiBox';
import { CSSTransition } from 'react-transition-group';
import { log } from 'util';

export const App = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>('');
  const [isEmojiBoxOpened, setEmojiBoxOpened] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('keydown', onTabKeyPress);

    return () => {
      document.removeEventListener('keydown', onTabKeyPress);
    };
  }, []);

  const onTabKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Tab") {
      setEmojiBoxOpened(true);
    }
  };


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
    <div className="app">
      <div className="input">
        <textarea
          tabIndex={-1}
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
