interface EmojiTabProps {
  activeTab: string;
  tabName: string;
  onTabChange: () => void;
}

export const EmojiTab: React.FC<EmojiTabProps> = ({ activeTab, tabName, onTabChange }) => {
  return (
    <div className={`emoji-box__tab ${activeTab === tabName ? 'emoji-box__tab--active' : ''}`} onClick={onTabChange}>
      <svg width="20" height="20" fill="none">
        <use xlinkHref={`#emoji-${tabName}`} />
      </svg>
    </div>
  );
};
