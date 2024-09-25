import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; // Import the context
import Quiz from '../components/quiz/Quiz';
import questions from '../data/questions.json';
import '../styles/Quiz.css';
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




const QuizPage = () => {
  const { language } = useAppContext(); // Get language from context
  const [startQuiz, setStartQuiz] = useState(false);
  const [difficulty, setDifficulty] = useState('niveau1');

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('difficulty');
    if (savedDifficulty) {
      setDifficulty(savedDifficulty);
    }
  }, []);

  const handleStartQuiz = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    localStorage.setItem('difficulty', selectedDifficulty); 
    setStartQuiz(true);
  };

  return (
    <div className="quiz-page">
      {!startQuiz ? (
        <div className="welcome">
          <h1>{translations[language].welcome}</h1>
          <h2 className='titre-difficulte'>{translations[language].difficultyTitle}</h2>
          <button className="level-button" onClick={() => handleStartQuiz('niveau1')}>
          {translations[language].level1}
        </button>
        <button className="level-button" onClick={() => handleStartQuiz('niveau2')}>
          {translations[language].level2}
        </button>
        <button className="level-button" onClick={() => handleStartQuiz('niveau3')}>
          {translations[language].level3}
        </button>

        </div>
      ) : (
        <Quiz setStartQuiz={setStartQuiz} difficulty={difficulty} />
      )}
    </div>
  );
};

export default QuizPage;
