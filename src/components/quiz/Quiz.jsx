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
    question: 'Question',
  },
  en: {
    quizFinished: 'Quiz finished! Your score is:',
    exit: 'Exit',
    replay: 'Replay',
    score: 'Score:',
    question: 'Question',
  },
  es: {
    quizFinished: '¡Quiz terminado! Tu puntuación es:',
    exit: 'Salir',
    replay: 'Repetir',
    score: 'Puntuación:',
    question: 'Pregunta',
  },
  it: {
    quizFinished: 'Quiz terminato! Il tuo punteggio è:',
    exit: 'Esci',
    replay: 'Rigiocare',
    score: 'Punteggio:',
    question: 'Domanda',
  },
  ru: {
    quizFinished: 'Викторина завершена! Ваш результат:',
    exit: 'Выход',
    replay: 'Перезапуск',
    score: 'Результат:',
    question: 'Вопрос',
  },
  ar: {
    quizFinished: 'انتهى الاختبار! نتيجتك هي:',
    exit: 'خروج',
    replay: 'إعادة اللعب',
    score: 'النقاط:',
    question: 'السؤال',
  },
};

const Quiz = ({ setStartQuiz, difficulty }) => {
  const { language } = useAppContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const currentQuestions = questions[language][difficulty];

  const handleAnswer = (index) => {
    if (isDisabled) return;
  
    setSelectedAnswer(index);
    const isCorrect = index === currentQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setResult(isCorrect);
    setIsDisabled(true);
  
    setTimeout(() => {
      setResult(null);
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswer(null);
      setIsDisabled(false);
    }, 1000);
  };
  

  const handleQuit = () => {
    setStartQuiz(false);
  };

  const handleReplay = () => {
    setCurrentQuestion(0);
    setScore(0);
    setStartQuiz(true);
  };

  return (
    <div className="quiz">
      {currentQuestion < currentQuestions.length ? (
        <>
          <button onClick={handleQuit} className="quit-button-mob">❌</button>
          <p className="question-number">
            {translations[language].question} {currentQuestion + 1} / {currentQuestions.length}
          </p>
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
          <h2 className='quizresultText'>{translations[language].quizFinished} {score}/{currentQuestions.length}</h2>
          <button onClick={handleQuit} className="quit-button">❌ {translations[language].exit}</button>
          <button onClick={handleReplay} className="replay-button">🔄 {translations[language].replay}</button>
          </>
      )}
    </div>
  );
};

export default Quiz;