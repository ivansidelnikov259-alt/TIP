import React, { useState, useEffect } from 'react';
import './ClickerGame.css';

const ClickerGame = ({ isDarkTheme, setIsDarkTheme }) => {
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const levelGoals = [
    { threshold: 0, image: '🎮 Начало пути!' },
    { threshold: 100, image: '🚀 Пфф это уровень абитуриента' },
    { threshold: 250, image: '⭐ Стандартный первак!' },
    { threshold: 500, image: '🔥 Прошёл первую сессию' },
    { threshold: 700, image: '💎 Мог и лучше!' },
    { threshold: 1000, image: '🏆 Неплохо! Уже второкурсник!' },
    { threshold: 1500, image: '👑 Впереди еще долгий путь!' },
    { threshold: 2000, image: '⚡ Вот и третий курс!' },
    { threshold: 2500, image: '🌟 Ты уже хочешь отчислиться?' },
    { threshold: 3000, image: '💫 Наконец четвертый курс! скоро выпуск(' },
    { threshold: 3500, image: '🎯 Диплом is coming...' },
    { threshold: 4000, image: '🚀 Время магов, аспирантов и других колдунов' },
    { threshold: 4500, image: '🏅 Вы получили силы президента ИТУ!' },
    { threshold: 5000, image: '👑 Вы стали сильнее президента ИКБ!' },
    { threshold: 5500, image: '💎 Вы сравнялись с президентом ИРИ!' },
    { threshold: 6000, image: '🔥 Вы превзошли президента ИТХТ!' },
    { threshold: 6500, image: '⭐ Это уже уровень президента ИИИ!' },
    { threshold: 7000, image: '🚀 Вы победили президента ИИТ!' },
    { threshold: 7500, image: '💫 Президент ИПТИП дышит Вам в спину!' },
    { threshold: 8000, image: '🎮 Абсолютная мощь! Но сможешь ли ты дойти до конца?' },
    { threshold: 8500, image: '🌟 Король А-9!' },
    { threshold: 9000, image: "🔥 Повелитель Unifood'а!" },
    { threshold: 9500, image: '💎 Тут сдался даже ректор РТУ МИРЭА!' },
    { threshold: 10000, image: '👽 БОГ РТУ МИРЭА!' }
  ];

  const handleClick = () => {
    setScore(prevScore => prevScore + 1);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  useEffect(() => {
    let newLevel = 0;
    for (let i = levelGoals.length - 1; i >= 0; i--) {
      if (score >= levelGoals[i].threshold) {
        newLevel = i;
        break;
      }
    }
    
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
    }

    const currentThreshold = levelGoals[newLevel].threshold;
    const nextThreshold = newLevel < levelGoals.length - 1 
      ? levelGoals[newLevel + 1].threshold 
      : levelGoals[newLevel].threshold;
    
    const progressPercentage = newLevel < levelGoals.length - 1 
      ? ((score - currentThreshold) / (nextThreshold - currentThreshold)) * 100
      : 100;
    
    setProgress(Math.min(progressPercentage, 100));
  }, [score, currentLevel, levelGoals]);

  const resetGame = () => {
    setScore(0);
    setCurrentLevel(0);
    setProgress(0);
  };

  return (
    <div className={`clicker-game ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      {}
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {isDarkTheme ? '☀️' : '🌙'}
      </button>

      <div className="game-header">
        <h1>Кликер Игра</h1>
        <div className="score-display">
          Очков: <span className="score-number">{score}</span>
        </div>
      </div>

      <div className="image-container">
        <div className="level-image">
          {levelGoals[currentLevel].image}
        </div>
        <div className="level-info">
          Уровень {currentLevel} | Следующая цель: {currentLevel < levelGoals.length - 1 ? levelGoals[currentLevel + 1].threshold : 'МАКСИМУМ!'} кликов
        </div>
      </div>

      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        >
          <span className="progress-text">
            {progress.toFixed(1)}%
          </span>
        </div>
      </div>

      <button className="click-button" onClick={handleClick}>
        КЛИКАЙ!
        <div className="click-effect">+1</div>
      </button>

      <div className="game-stats">
        <div className="stat">
          <span>Текущий уровень:</span>
          <strong>{currentLevel}</strong>
        </div>
        <div className="stat">
          <span>До следующего уровня:</span>
          <strong>
            {currentLevel < levelGoals.length - 1 
              ? levelGoals[currentLevel + 1].threshold - score 
              : 'МАКСИМУМ!'}
          </strong>
        </div>
      </div>

      <button className="reset-button" onClick={resetGame}>
        Начать заново
      </button>
    </div>
  );
};

export default ClickerGame;