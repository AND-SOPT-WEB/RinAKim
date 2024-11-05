import React from 'react';
import './Header.css';

const Header = ({ selectedTab, onTabChange, time }) => {
  return (
    <header className="header">
      <span>1 to 50</span>
      <div className="tabs">
        <button
          onClick={() => onTabChange('game')}
          className={selectedTab === 'game' ? 'active' : ''}
        >
          게임
        </button>
        <button
          onClick={() => onTabChange('ranking')}
          className={selectedTab === 'ranking' ? 'active' : ''}
        >
          랭킹
        </button>
      </div>
      {selectedTab === 'game' && (
        <div className="header-right">
          <select>
            <option>레벨 1</option>
            <option>레벨 2</option>
            <option>레벨 3</option>
          </select>
          <span>타이머: {time.toFixed(2)} 초</span>
        </div>
      )}
    </header>
  );
};

export default Header;
