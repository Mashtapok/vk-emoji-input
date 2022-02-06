interface EmojiButtonProps {
  onClick: () => void;
}

export const EmojiButton: React.FC<EmojiButtonProps> = ({ onClick }) => {
  return (
    <div className="input__icon" role="button" onClick={onClick}>
      <svg width="20" height="20" fill="none">
        <use xlinkHref="#emoji-smile" />
      </svg>
    </div>
  );
};
