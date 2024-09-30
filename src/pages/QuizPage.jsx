import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'; 
import { useParams, useNavigate } from 'react-router-dom';
import Quiz from '../components/quiz/Quiz';
import questions from '../data/questions.json';
import '../styles/Quiz.css';
import SEO from '../components/SEO';

const translations = {
  fr: {
    welcome: "Bienvenue dans le quiz du dialecte algérien",
    title: "Choisissez votre langue",
    difficultyTitle: "Choisissez le niveau de difficulté",
    niveau1: "Niveau 1",
    niveau2: "Niveau 2",
    niveau3: "Niveau 3",
    seo: {
      title: "Quiz de dialecte Algérien",
      description: "Testez vos connaissances en dialècte algérien avec nos quiz",
      keywords: "quiz algérien, quiz de langue, apprendre l'algérien, quiz sur le dialecte algérien, quiz de langue algérienne, quiz arabe, quiz de dialecte arabe, jeu arabe, apprendre l'algérien, Algérie, apprendre la langue algérienne, apprendre le dialecte algérien, quiz gratuit, apprendre l'algérien en ligne, apprendre l'algérien gratuitement",
      og: {
        title: "Quiz de dialecte algérien",
        description: "Testez vos connaissances en dialecte algérien avec nos quiz",
      }
    },
  },
  en: {
    welcome: "Welcome to the Algerian Dialect Quiz",
    title: "Choose Your Language",
    difficultyTitle: "Choose Difficulty Level",
    niveau1: "Level 1",
    niveau2: "Level 2",
    niveau3: "Level 3",
    seo: {
      title: "Algerian Dialect Quiz",
      description: "Challenge your skills with our Algerian language quizzes. Suitable for all levels!",
      keywords: "Algerian quiz, language quiz, learn Algerian, Algerian dialect quiz, Algerian language quiz, arabic quiz, arabic dialect quiz, arabic game, learn algerian, algeria, learn algerian language, learn algerian dialect, free quiz, learn algerian online, learn algerian for free",
      og: {
        title: "Algerian Dialect Quiz",
        description: "Challenge your skills with our Algerian language quizzes.",
      }
    },
  },
  es: {
    welcome: "Bienvenido al Quiz de Dialecto Argelino",
    title: "Elige tu idioma",
    difficultyTitle: "Elige el nivel de dificultad",
    niveau1: "Nivel 1",
    niveau2: "Nivel 2",
    niveau3: "Nivel 3",
    seo: {
      title: "Quiz de dialecto argelino",
      description: "Pon a prueba tus habilidades con nuestros cuestionarios de lengua argelina. ¡Adecuado para todos los niveles!",
      keywords: "cuestionario argelino, cuestionario de lengua, aprender argelino, cuestionario de dialecto argelino, cuestionario de lengua argelina, cuestionario árabe, cuestionario de dialecto árabe, juego árabe, aprender argelino, Argelia, aprender el idioma argelino, aprender el dialecto argelino, cuestionario gratuito, aprender argelino en línea, aprender argelino gratis",
      og: {
        title: "Quiz de dialecto argelino",
        description: "Pon a prueba tus habilidades con nuestros cuestionarios de lengua argelina.",
      }
    },
  },
  it: {
    welcome: "Benvenuto al Quiz del Dialetto Algerino",
    title: "Scegli la tua lingua",
    difficultyTitle: "Scegli il livello di difficoltà",
    niveau1: "Livello 1",
    niveau2: "Livello 2",
    niveau3: "Livello 3",
    seo: {
      title: "Quiz del Dialetto Algerino",
      description: "Metti alla prova le tue abilità con i nostri quiz di lingua algerina. Adatto a tutti i livelli!",
      keywords:  "quiz algerino, quiz di lingua, imparare l'algerino, quiz sul dialetto algerino, quiz di lingua algerina, quiz arabo, quiz di dialetto arabo, gioco arabo, imparare l'algerino, Algeria, imparare la lingua algerina, imparare il dialetto algerino, quiz gratuito, imparare l'algerino online, imparare l'algerino gratuitamente",
      og: {
        title: "Quiz del Dialetto Algerino",
        description: "Metti alla prova le tue abilità con i nostri quiz di dialetto algerino.",
      }
    },
  },
  ru: {
    welcome: "Добро пожаловать в викторину по алжирскому диалекту",
    title: "Выберите свой язык",
    difficultyTitle: "Выберите уровень сложности",
    niveau1: "Уровень 1",
    niveau2: "Уровень 2",
    niveau3: "Уровень 3",
    seo: {
      title: "Викторина по алжирскому диалекту",
      description: "Проверьте свои навыки с нашими викторинами по алжирскому диалекту. Подходит для всех уровней!",
      keywords: "алжирская викторина, языковая викторина, изучение алжирского, викторина по алжирскому диалекту, викторина по алжирскому языку, арабская викторина, викторина по арабскому диалекту, арабская игра, изучение алжирского, Алжир, изучение алжирского языка, изучение алжирского диалекта, бесплатная викторина, изучение алжирского онлайн, изучение алжирского бесплатно",
      og: {
        title: "Викторина по алжирскому диалекту",
        description: "Проверьте свои навыки с нашими викторинами по алжирскому диалекту.",
      }
    },
  },
  ar: {
    welcome: "مرحبا بكم في اختبار اللهجة الجزائرية",
    title: "اختر لغتك",
    difficultyTitle: "اختر مستوى الصعوبة",
    niveau1: "المستوى 1",
    niveau2: "المستوى 2",
    niveau3: "المستوى 3",
    seo: {
      title: "اختبار اللهجة الجزائرية",
      description: "اختبر مهاراتك مع أسئلة اللهجة الجزائرية. مناسب لجميع المستويات!",
      keywords: "أسئلة جزائرية، أسئلة لغة، اختبار لهجة جزائرية، اختبار لهجات، أسئلة لهجات، تعلم الجزائرية، أسئلة اللهجة الجزائرية، أسئلة اللغة الجزائرية، أسئلة عربية، أسئلة لهجة عربية، لعبة عربية، تعلم الجزائرية، الجزائر، تعلم اللغة الجزائرية، تعلم اللهجة الجزائرية، أسئلة مجانية، تعلم الجزائرية عبر الإنترنت، تعلم الجزائرية مجاناً، اختبار مجاني، أسئلة مجانية",
      og: {
        title: "اختبار اللهجة الجزائرية",
        description: "اختبر مهاراتك مع أسئلة اللهجة الجزائرية.",
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
          <h1 className='welcomeText'>{translations[language].welcome}</h1>
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
