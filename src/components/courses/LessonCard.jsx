import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import '../../styles/Courses.css';
import lessonsData from '../../data/lessons.json';

const LessonCard = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { language, translations } = useAppContext(); // Accédez aux traductions ici
  const course = lessonsData.courses[courseId];

  if (!course) {
    return <div>{translations[language].lesson.title}: Course not found</div>;
  }

  const [currentLessonIndex, setCurrentLessonIndex] = React.useState(0);
  const totalLessons = course.lessons.length;

  const handleNext = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleClose = () => {
    navigate('/courses'); 
  };

  const lesson = course.lessons[currentLessonIndex]; 

  return (
    <div className="lesson-card">
      <button className="close-button" onClick={handleClose}>
        {translations[language].lesson.close}
      </button>
      <h2>{course.title[language]}</h2>
      <h3>{lesson.word.dz}</h3>
      <p>{lesson.word[language] || translations[language].lesson.note}</p>
      <div className="button-container">
        <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
          {translations[language].lesson.previous}
        </button>
        <div className='lesson-progress'>
          {currentLessonIndex + 1} / {totalLessons}
        </div>
        <button onClick={handleNext} disabled={currentLessonIndex === totalLessons - 1}>
          {translations[language].lesson.next}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
