import React from 'react';
import { useAppContext } from '../../context/AppContext';
import '../../styles/Courses.css';
const LessonCard = ({ lesson, onNext, onPrev, onClose, translations, currentLessonIndex, totalLessons }) => {
  const { language } = useAppContext();

  return (
    <div className="lesson-card">
      <button className="close-button" onClick={onClose}>
        {translations.close}
      </button>
      <h3>{lesson.word.dz}</h3>
      <p>{lesson.word[language] || "Translation not available"}</p>
      <div className="button-container">
        <button onClick={onPrev} disabled={currentLessonIndex === 0}>{translations.previous}</button>
        <div className='lesson-progress'>
        {currentLessonIndex + 1} / {totalLessons}
      </div> <button onClick={onNext} disabled={currentLessonIndex === totalLessons - 1}>{translations.next}</button>
      </div>
     
    </div>
  );
};

export default LessonCard;
