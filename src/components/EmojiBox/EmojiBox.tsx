import './EmogiBox.css';
import { useEffect, useState } from 'react';
import { EmojiTab } from './EmojiTab';
import { EmojiBoxContent } from '../EmojiBoxContent/EmojiBoxContent';
import sections from '../../assets/sections.json';

const tabs = ['smile', 'recent'];
const NUMBER_OF_RECENT = 25;

export const EmojiBox = ({onSelectEmoji} : any) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0]);

    const [recentEmojiMap, setRecentEmojiMap] = useState<Record<string, string>>({});
    const [recentEmojiArray, setRecentEmojiArray] = useState<string[]>([]);
    const [tabContent, setTabContent] = useState<any>({ smile: sections, recent: [] });

    useEffect(() => {
      const sortByFrequency = (map: Record<string, string>): string[] => Object
        .entries(map)
        .sort((a: any, b: any) => b[1] - a[1])
        .map((entry) => entry[0]);

      const newRecent = sortByFrequency(recentEmojiMap);
      setRecentEmojiArray(newRecent);
      setTabContent((prev: any) => ({ ...prev, recent: [{ title: 'Часто используемые', items: newRecent }] }));
    }, [recentEmojiMap]);

    const onTabChange = (tab: string) => {
      setActiveTab(tab);
    };

    const addEmoji = (emoji: string) => {
      const copyRecentEmojiMap: any = recentEmojiMap;
      if (copyRecentEmojiMap && copyRecentEmojiMap[emoji]) {
        copyRecentEmojiMap[emoji]++;
      } else {
        const recent = recentEmojiArray;
        if (recent.length > NUMBER_OF_RECENT) {
          delete copyRecentEmojiMap[recent[recent.length - 1]];
        }
        copyRecentEmojiMap[emoji] = 1;
      }

      setRecentEmojiMap({ ...copyRecentEmojiMap });
      localStorage.setItem('recentEmoji', JSON.stringify(copyRecentEmojiMap));
    };

    useEffect(() => {
      const recent = JSON.parse(localStorage.getItem('recentEmoji') || '{}');
      setRecentEmojiMap(recent);
    }, []);

    return (
      <div className="emoji-box">
        <div className="ui-scroll">
          <div className="ui-scroll__viewport">
            <EmojiBoxContent sections={tabContent[activeTab]} addEmoji={addEmoji} onSelectEmoji={onSelectEmoji} />
          </div>
          <div className="ui-scroll__container">
            <div className="ui-scroll__scrollbar" />
          </div>
        </div>
        <div className="emoji-box__tabs">
          {tabs.map(tab => (
            <EmojiTab activeTab={activeTab} key={tab} tabName={tab} onTabChange={() => onTabChange(tab)} />
          ))}
        </div>
      </div>
    );
  }
;
