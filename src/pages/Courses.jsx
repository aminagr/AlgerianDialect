import React from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import LessonCard from '../components/courses/LessonCard'; 
import lessonsData from '../data/lessons.json';
import translations from '../data/translations';

const Courses = () => {
  const {
    language,
    selectedCourse,
    setSelectedCourse,
    currentLessonIndex,
    setCurrentLessonIndex,
    currentPage,
    setCurrentPage,
  } = useAppContext();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setCurrentLessonIndex(0);
    setCurrentPage('course');
  };

  const handleClose = () => {
    setSelectedCourse(null);
    setCurrentLessonIndex(0);
    setCurrentPage('courses');
  };

  const renderCourseCards = () => {
    return Object.keys(lessonsData.courses).map((course, index) => (
      <CourseCard
        key={index}
        title={lessonsData.courses[course].title[language]}
        onClick={() => handleCourseClick(course)}
      />
    ));
  };

  const renderContent = () => {
    if (currentPage === 'course') {
      if (!selectedCourse) return null;

      const lesson = lessonsData.courses[selectedCourse].lessons[currentLessonIndex];
      const totalLessons = lessonsData.courses[selectedCourse].lessons.length;

      return (
        <LessonCard
          lesson={lesson}
          courseTitle={lessonsData.courses[selectedCourse].title[language]}
          language={language}
          onNext={() => setCurrentLessonIndex((prevIndex) => Math.min(prevIndex + 1, totalLessons - 1))}
          onPrev={() => setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0))}
          onClose={handleClose}
          translations={translations[language].lesson}
          currentLessonIndex={currentLessonIndex}
          totalLessons={totalLessons}
        />
      );
    } else {
      return <div className="courses">{renderCourseCards()}</div>;
    }
  };

  return (
    <div className="courses-page">
      {renderContent()}
    </div>
  );
};

export default Courses;
