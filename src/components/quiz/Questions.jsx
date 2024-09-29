import React from 'react';
import '../../styles/Quiz.css';
const Question = ({ question, handleAnswer, result, selectedAnswer, isDisabled }) => {
  return (
    <div className={`question ${result !== null ? (result ? 'fade-in-correct' : 'fade-in-wrong') : ''}`}>
      <h2 className='question-name'>{question.question}</h2>
      {question.answers.map((answer, index) => {
        let buttonClass = 'answer-button';

        if (result !== null) {
          buttonClass += index === question.correct ? ' correct' : '';
          buttonClass += !result && index === selectedAnswer ? ' wrong' : '';
        } else {
          buttonClass += selectedAnswer === index ? ' selected' : ''; 
        }

        return (
          <button 
            key={index} 
            onClick={() => handleAnswer(index)} 
            className={buttonClass}
            disabled={isDisabled}
          >
            {answer}
          </button>
        );
      })}
      {result !== null && (
        <p className={result === false ? 'wrong-answer' : 'correct-answer'}></p>
      )}
    </div>
  );
};


export default Question;