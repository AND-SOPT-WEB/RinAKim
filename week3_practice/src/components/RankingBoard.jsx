// src/components/RankingBoard.jsx

import React, { useEffect, useState } from 'react';
import './RankingBoard.css';

const RankingBoard = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    const storedRecords = Object.keys(localStorage)
      .filter((key) => key.startsWith('gameResult_'))
      .map((key) => JSON.parse(localStorage.getItem(key)))
      .sort((a, b) => parseFloat(a.playTime) - parseFloat(b.playTime)); // 플레이 시간 기준으로 오름차순 정렬

    setRecords(storedRecords);
  };

  const handleReset = () => {
    // 로컬 스토리지에서 랭킹 관련 데이터 삭제
    Object.keys(localStorage)
      .filter((key) => key.startsWith('gameResult_'))
      .forEach((key) => localStorage.removeItem(key));

    // 화면에 빈 상태로 갱신
    setRecords([]);
  };

  return (
    <div className="ranking-board">
      <div className="ranking-header">
        <h2>랭킹</h2>
        <button className="reset-button" onClick={handleReset}>
          초기화
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>타임스탬프</th>
            <th>레벨</th>
            <th>플레이 시간</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.level}</td>
                <td>{record.playTime} 초</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                기록이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RankingBoard;
