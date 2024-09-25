import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import '../../styles/Courses.css';
import lessonsData from '../../data/lessons.json';

const LessonCard = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { language, translations } = useAppContext(); 
  const course = lessonsData.courses[courseId];

  if (!course) {
    return <div>{translations[language].lesson.title}: Course not found</div>;
  }

  const lesson = lessonId 
    ? course.lessons.find(lesson => lesson.id === parseInt(lessonId)) 
    : course.lessons[0]; 

  if (!lesson) {
    return <div>{translations[language].lesson.title}: Lesson not found</div>;
  }

  const currentLessonIndex = course.lessons.indexOf(lesson);
  const totalLessons = course.lessons.length;

  const handleNext = () => {
    const nextLessonId = currentLessonIndex + 1;
    if (nextLessonId < totalLessons) {
      navigate(`/courses/${courseId}/${course.lessons[nextLessonId].id}`);
    }
  };

  const handlePrev = () => {
    const prevLessonId = currentLessonIndex - 1;
    if (prevLessonId >= 0) {
      navigate(`/courses/${courseId}/${course.lessons[prevLessonId].id}`);
    }
  };

  const handleClose = () => {
    navigate('/courses'); 
  };

  return (
    <div className="lesson-card">
      <button className="close-button" onClick={handleClose}>
        ❌
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
