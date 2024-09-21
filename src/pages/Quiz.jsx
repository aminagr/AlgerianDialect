import React, { useState } from 'react';

import Quiz from '../components/quiz/Quiz'

const translations = {
  fr: {
    welcome: "Bienvenue dans le quiz de langue algérienne",
    title: "Choisissez votre langue",
    difficultyTitle: "Choisissez le niveau de difficulté",
    level1: "Niveau 1",
    level2: "Niveau 2",
    level3: "Niveau 3",
  },
  en: {
    welcome: "Welcome to the Algerian Language Quiz",
    title: "Choose Your Language",
    difficultyTitle: "Choose Difficulty Level",
    level1: "Level 1",
    level2: "Level 2",
    level3: "Level 3",
  },
  es: {
    welcome: "Bienvenido al Quiz de Lengua Argelina",
    title: "Elige tu idioma",
    difficultyTitle: "Elige el nivel de dificultad",
    level1: "Nivel 1",
    level2: "Nivel 2",
    level3: "Nivel 3",
  },
  it: {
    welcome: "Benvenuto al Quiz della Lingua Algerina",
    title: "Scegli la tua lingua",
    difficultyTitle: "Scegli il livello di difficoltà",
    level1: "Livello 1",
    level2: "Livello 2",
    level3: "Livello 3",
  },
  ru: {
    welcome: "Добро пожаловать в викторину по алжирскому языку",
    title: "Выберите свой язык",
    difficultyTitle: "Выберите уровень сложности",
    level1: "Уровень 1",
    level2: "Уровень 2",
    level3: "Уровень 3",
  },
  ar: {
    welcome: "مرحبا بكم في اختبار اللغة الجزائرية",
    title: "اختر لغتك",
    difficultyTitle: "اختر مستوى الصعوبة",
    level1: "المستوى 1",
    level2: "المستوى 2",
    level3: "المستوى 3",
  },
};

const Quiz = ({ setStartQuiz }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'; // Default to 'en' if not set
  });
  const [difficulty, setDifficulty] = useState(null);

  const handleStartQuiz = (level) => {
    setDifficulty(level);
    setStartQuiz(true);
    localStorage.setItem('language', language); // Store language in local storage
    localStorage.setItem('difficulty', level); // Store difficulty in local storage
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage); // Save to local storage
  };

  return (
    <div className="home">
      <h1 className='welcome'>{translations[language].welcome}</h1>
      <h2>{translations[language].title}</h2>
      <select onChange={handleLanguageChange} value={language}>
        <option value="en">🇬🇧 English</option>
        <option value="fr">🇫🇷 Français</option>
        <option value="es">🇪🇸 Español</option>
        <option value="it">🇮🇹 Italiano</option>
        <option value="ru">🇷🇺 Русский</option>
        <option value="ar">🇸🇦 العربية</option>
      </select>
      <h2>{translations[language].difficultyTitle}</h2>
      <button onClick={() => handleStartQuiz('niveau1')}>{translations[language].level1}</button>
      <button onClick={() => handleStartQuiz('niveau2')}>{translations[language].level2}</button>
      <button onClick={() => handleStartQuiz('niveau3')}>{translations[language].level3}</button>
    </div>
  );
};

export default Quiz;