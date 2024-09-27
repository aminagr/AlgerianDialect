import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; 
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../components/quiz/Quiz';
import questions from '../data/questions.json';
import '../styles/Quiz.css';
import SEO from '../components/SEO';

const translations = {
  fr: {
    welcome: "Bienvenue dans le quiz de langue algérienne",
    title: "Choisissez votre langue",
    difficultyTitle: "Choisissez le niveau de difficulté",
    niveau1: "Niveau 1",
    niveau2: "Niveau 2",
    niveau3: "Niveau 3",
    seo: {
      title: "Quiz de Dialecte Algérien",
      description: "Testez vos connaissances en dialècte algérien avec nos quiz",
      keywords: "quiz algérien, quiz de langue, apprendre l'algérien",
      og: {
        title: "Quiz de Dialècte Algérien",
        description: "Testez vos connaissances en dialècte algérien avec nos quiz",
      }
    },
  },
  en: {
    welcome: "Welcome to the Algerian Language Quiz",
    title: "Choose Your Language",
    difficultyTitle: "Choose Difficulty Level",
    niveau1: "Level 1",
    niveau2: "Level 2",
    niveau3: "Level 3",
    seo: {
      title: "Algerian Language Quiz",
      description: "Challenge your skills with our Algerian language quizzes. Suitable for all levels!",
      keywords: "Algerian quiz, language quiz, learn Algerian",
      og: {
        title: "Algerian Language Quiz",
        description: "Challenge your skills with our Algerian language quizzes.",
      }
    },
  },
  es: {
    welcome: "Bienvenido al Quiz de Lengua Argelina",
    title: "Elige tu idioma",
    difficultyTitle: "Elige el nivel de dificultad",
    niveau1: "Nivel 1",
    niveau2: "Nivel 2",
    niveau3: "Nivel 3",
    seo: {
      title: "Quiz de Lengua Argelina",
      description: "Pon a prueba tus habilidades con nuestros cuestionarios de lengua argelina. ¡Adecuado para todos los niveles!",
      keywords: "quiz argelino, quiz de lengua, aprender argelino",
      og: {
        title: "Quiz de Lengua Argelina",
        description: "Pon a prueba tus habilidades con nuestros cuestionarios de lengua argelina.",
      }
    },
  },
  it: {
    welcome: "Benvenuto al Quiz della Lingua Algerina",
    title: "Scegli la tua lingua",
    difficultyTitle: "Scegli il livello di difficoltà",
    niveau1: "Livello 1",
    niveau2: "Livello 2",
    niveau3: "Livello 3",
    seo: {
      title: "Quiz della Lingua Algerina",
      description: "Metti alla prova le tue abilità con i nostri quiz di lingua algerina. Adatto a tutti i livelli!",
      keywords: "quiz algerino, quiz di lingua, imparare l'algerino",
      og: {
        title: "Quiz della Lingua Algerina",
        description: "Metti alla prova le tue abilità con i nostri quiz di lingua algerina.",
      }
    },
  },
  ru: {
    welcome: "Добро пожаловать в викторину по алжирскому языку",
    title: "Выберите свой язык",
    difficultyTitle: "Выберите уровень сложности",
    niveau1: "Уровень 1",
    niveau2: "Уровень 2",
    niveau3: "Уровень 3",
    seo: {
      title: "Викторина по алжирскому языку",
      description: "Проверьте свои навыки с нашими викторинами по алжирскому языку. Подходит для всех уровней!",
      keywords: "алжирская викторина, викторина по языку, изучение алжирского",
      og: {
        title: "Викторина по алжирскому языку",
        description: "Проверьте свои навыки с нашими викторинами по алжирскому языку.",
      }
    },
  },
  ar: {
    welcome: "مرحبا بكم في اختبار اللغة الجزائرية",
    title: "اختر لغتك",
    difficultyTitle: "اختر مستوى الصعوبة",
    niveau1: "المستوى 1",
    niveau2: "المستوى 2",
    niveau3: "المستوى 3",
    seo: {
      title: "اختبار اللغة الجزائرية",
      description: "اختبر مهاراتك مع اختبارات اللغة الجزائرية. مناسب لجميع المستويات!",
      keywords: "أسئلة اللهجة الجزائرية، اختبار لغة، تعلم الجزائرية",
      og: {
        title: "اختبار اللغة الجزائرية",
        description: "اختبر مهاراتك مع اختبارات اللغة الجزائرية.",
      }
    },
  },
};

const QuizPage = () => {
  const { language } = useAppContext(); 
  const { level } = useParams();
  const navigate = useNavigate();
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
    navigate(`/quiz/${lvl}`);
  };

  return (
    <div className="quiz-page">
      <SEO 
        title={translations[language].seo.title} 
        description={translations[language].seo.description} 
        keywords={translations[language].seo.keywords} 
        image="url-to-quiz-image.jpg" 
      />
      {!startQuiz ? (
        <div className="welcome">
          <h1>{translations[language].welcome}</h1>
          <h2 className='titre-difficulte'>{translations[language].difficultyTitle}</h2>
          {['niveau1', 'niveau2', 'niveau3'].map((lvl) => (
            <button
              key={lvl}
              className="level-button"
              onClick={() => handleStartQuiz(lvl)}
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
