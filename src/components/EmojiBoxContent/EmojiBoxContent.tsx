import './EmojiBoxContent.css';

interface EmojiSection {
  title: string;
  items: string[];
}

interface EmojiBoxContentProps {
  sections: EmojiSection[];
  addEmoji: (emoji: string) => void;
  onSelectEmoji: (emoji: string) => void;
}

export const EmojiBoxContent: React.FC<EmojiBoxContentProps> = ({ sections, addEmoji, onSelectEmoji }) => {

  const onAddEmoji = (event: any, emoji: string) => {
    addEmoji(emoji);
    onSelectEmoji(emoji);
  };

  return (
    <>
      {sections.length && sections.map(section => <div className="emoji-section" key={section.title}>
        <div className="emoji-section__title">{section.title}</div>
        <div className="emoji-section__items">
          {section?.items?.length && section.items.map((emoji, index) => <div className="emoji-section__item"
                                                                              onClick={(e) => onAddEmoji(e, emoji)}
                                                                              key={index}>{emoji}</div>)}
        </div>
      </div>)}
    </>
  );
};
