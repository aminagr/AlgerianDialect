import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; 
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../components/quiz/Quiz';
import questions from '../data/questions.json';
import '../styles/Quiz.css';
const translations = {
  fr: {
    welcome: "Bienvenue dans le quiz de langue algérienne",
    title: "Choisissez votre langue",
    difficultyTitle: "Choisissez le niveau de difficulté",
    niveau1: "Niveau 1",
    niveau2: "Niveau 2",
    niveau3: "Niveau 3",
  },
  en: {
    welcome: "Welcome to the Algerian Language Quiz",
    title: "Choose Your Language",
    difficultyTitle: "Choose Difficulty Level",
    niveau1: "Level 1",
    niveau2: "Level 2",
    niveau3: "Level 3",
  },
  es: {
    welcome: "Bienvenido al Quiz de Lengua Argelina",
    title: "Elige tu idioma",
    difficultyTitle: "Elige el nivel de dificultad",
    niveau1: "Nivel 1",
    niveau2: "Nivel 2",
    niveau3: "Nivel 3",
  },
  it: {
    welcome: "Benvenuto al Quiz della Lingua Algerina",
    title: "Scegli la tua lingua",
    difficultyTitle: "Scegli il livello di difficoltà",
    niveau1: "Livello 1",
    niveau2: "Livello 2",
    niveau3: "Livello 3",
  },
  ru: {
    welcome: "Добро пожаловать в викторину по алжирскому языку",
    title: "Выберите свой язык",
    difficultyTitle: "Выберите уровень сложности",
    niveau1: "Уровень 1",
    niveau2: "Уровень 2",
    niveau3: "Уровень 3",
  },
  ar: {
    welcome: "مرحبا بكم في اختبار اللغة الجزائرية",
    title: "اختر لغتك",
    difficultyTitle: "اختر مستوى الصعوبة",
    niveau1: "المستوى 1",
    niveau2: "المستوى 2",
    niveau3: "المستوى 3",
  },
};




const QuizPage = () => {
  const { language } = useAppContext(); 
  const { level } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [startQuiz, setStartQuiz] = useState(false);
  const [difficulty, setDifficulty] = useState(level || 'niveau1');

  useEffect(() => {
    if (level && questions[language][level]) {
      setDifficulty(level);
      setStartQuiz(true);
    }
  }, [level, language]);

  const handleStartQuiz = (lvl) => {
    setDifficulty(lvl);
    setStartQuiz(true);
    navigate(`/quiz/${lvl}`); // Update the URL with the selected level
  };

  return (
    <div className="quiz-page">
      {!startQuiz ? (
        <div className="welcome">
          <h1>{translations[language].welcome}</h1>
          <h2 className='titre-difficulte'>{translations[language].difficultyTitle}</h2>
          {['niveau1', 'niveau2', 'niveau3'].map((lvl) => (
            <button
              key={lvl}
              className="level-button"
              onClick={() => handleStartQuiz(lvl)} // Use the new handler
            >
              {translations[language][lvl]}
            </button>
          ))}
        </div>
      ) : (
        <Quiz setStartQuiz={setStartQuiz} difficulty={difficulty} />
      )}
    </div>
  );
};

export default QuizPage;