import './EmogiBox.css';
import { useState } from 'react';
import { EmojiTab } from './EmojiTab';

const tabs = ['smile', 'recent'];

export const EmojiBox = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const onTabChange = (tab: string) => setActiveTab(tab);

  return (
    <div className="emoji-box">
      <div className="ui-scroll"></div>
      <div className="emoji-box__tabs">
        {tabs.map(tab => (
          <EmojiTab activeTab={activeTab} key={tab} tabName={tab} onTabChange={() => onTabChange(tab)} />
        ))}
      </div>
    </div>
  );
};
