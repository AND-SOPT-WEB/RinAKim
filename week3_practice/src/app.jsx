// src/App.jsx

import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import RankingBoard from './components/RankingBoard';
import './App.css';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('game'); // 'game' 또는 'ranking'
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const [nextNumber, setNextNumber] = useState(1);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isGameStarted) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    } else {
      clearInterval(timerRef.current); // 타이머 정지
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timerRef.current);
  }, [isGameStarted]);

  const startGame = () => {
    setTime(0); // 타이머 초기화
    setNextNumber(1);
    setIsGameStarted(false); // 처음엔 false로 두고 첫 클릭에서 시작
    setIsGameCompleted(false);
  };

  const startTimerOnFirstClick = () => {
    if (!isGameStarted) {
      setIsGameStarted(true); // 첫 숫자를 누를 때 타이머 시작
    }
  };

  const completeGame = () => {
    setIsGameStarted(false); // 타이머 멈추기
    setIsGameCompleted(true);

    // 게임 완료 시 로컬 스토리지에 기록 저장
    const gameData = {
      date: new Date().toLocaleString(),
      level: "레벨 1",
      playTime: time.toFixed(2),
    };
    localStorage.setItem(`gameResult_${Date.now()}`, JSON.stringify(gameData));

    alert(`성공! ${time.toFixed(2)}초 소요`);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setTime(0);
    setNextNumber(1);
    setIsGameCompleted(false);
  };

  const handleTabChange = (tab) => {
    resetGame();
    setSelectedTab(tab);
  };

  return (
    <>
      <Header
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
        time={time}
        isGameStarted={isGameStarted}
      />
      <div className="app">
        {selectedTab === 'game' && (
          <div className="game-container">
            <div className="next-number">다음 숫자: {nextNumber}</div>
            <Board
              nextNumber={nextNumber}
              onCorrectClick={() => {
                startTimerOnFirstClick(); // 첫 숫자 클릭 시 타이머 시작
                setNextNumber((prev) => prev + 1);
              }}
              onGameComplete={completeGame}
            />
          </div>
        )}
        {selectedTab === 'ranking' && <RankingBoard />}
      </div>
    </>
  );
};

export default App;
