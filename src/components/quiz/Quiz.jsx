import React, { useState, useEffect } from 'react';
import Question from './Questions';

import questions from '../../data/questions.json';
import '../../styles/Quiz.css';
import { useAppContext } from '../../context/AppContext';

const translations = {
  fr: {
    quizFinished: 'Quiz terminé! Votre score est:',
    exit: 'Quitter',
    replay: 'Rejouer',
    score: 'Score:',
  },
  en: {
    quizFinished: 'Quiz finished! Your score is:',
    exit: 'Exit',
    replay: 'Replay',
    score: 'Score:',
  },
  es: {
    quizFinished: '¡Quiz terminado! Tu puntuación es:',
    exit: 'Salir',
    replay: 'Repetir',
    score: 'Puntuación:',
  },
  it: {
    quizFinished: 'Quiz terminato! Il tuo punteggio è:',
    exit: 'Esci',
    replay: 'Rigiocare',
    score: 'Punteggio:',
  },
  ru: {
    quizFinished: 'Викторина завершена! Ваш результат:',
    exit: 'Выход',
    replay: 'Перезапуск',
    score: 'Результат:',
  },
  ar: {
    quizFinished: 'انتهى الاختبار! نتيجتك هي:',
    exit: 'خروج',
    replay: 'إعادة اللعب',
    score: 'النقاط:',
  },
};

const Quiz = ({ setStartQuiz, difficulty }) => {
  const { language } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem('currentQuestion');
    return savedQuestion ? JSON.parse(savedQuestion) : 0;
  });

  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('score');
    return savedScore ? JSON.parse(savedScore) : 0;
  });

  const [result, setResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const currentQuestions = questions[language][difficulty]; 


  useEffect(() => {
    localStorage.setItem('currentQuestion', currentQuestion);
    localStorage.setItem('score', score);
  }, [currentQuestion, score]);

  const handleAnswer = (index) => {
    if (isDisabled) return;

    setSelectedAnswer(index);
    const isCorrect = index === currentQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setResult(isCorrect);
    setIsDisabled(true);

    setTimeout(() => {
      setResult(null);
      setSelectedAnswer(null);
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setIsDisabled(false);
    }, 1000);
  };

  const handleQuit = () => {
    setStartQuiz(false);
    localStorage.removeItem('currentQuestion'); // Clear saved question
    localStorage.removeItem('score'); // Clear saved score
    localStorage.removeItem('difficulty'); // Clear saved difficulty
  };

  const handleReplay = () => {
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setStartQuiz(true); // Start quiz again
    localStorage.removeItem('currentQuestion'); // Clear saved question
    localStorage.removeItem('score'); // Clear saved score
  };

  return (
    <div className="quiz">
      
      {currentQuestion < currentQuestions.length ? (
        <>
          <button onClick={handleQuit} className="quit-button-mob">❌</button>
          <p className="question-number">{language === 'fr' ? 'Question' : 'Question'} {currentQuestion + 1} / {currentQuestions.length}</p>
          <Question 
            question={currentQuestions[currentQuestion]} 
            handleAnswer={handleAnswer} 
            result={result}
            selectedAnswer={selectedAnswer}
            isDisabled={isDisabled}
          />
          <h2>{translations[language].score} {score}</h2>
        </>
      ) : (
        <>
          <h2>{translations[language].quizFinished} {score}/{currentQuestions.length}</h2>
          <button onClick={handleQuit} className="quit-button"><span>{translations[language].exit}</span>❌</button>
          <button onClick={handleReplay} className="replay-button">{translations[language].replay}</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
