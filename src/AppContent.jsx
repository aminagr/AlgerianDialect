
import React from 'react';
import { useAppContext } from './context/AppContext';
import lessonsData from './data/lessons.json'; // Your lessons data
import translations from './data/translations'; // Your translations data
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';



const AppContent = () => {
  const {
    language,
    /*selectedCourse,
    setSelectedCourse,
    currentLessonIndex,
    setCurrentLessonIndex,
    currentPage,
    setCurrentPage,*/
  } = useAppContext();
/*
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setCurrentLessonIndex(0);
    setCurrentPage('course');
  };

  const handleNext = () => {
    setCurrentLessonIndex((prevIndex) => 
      Math.min(prevIndex + 1, lessonsData.courses[selectedCourse].lessons.length - 1)
    );
  };

  const handlePrev = () => {
    setCurrentLessonIndex((prevIndex) => Math.max(prevIndex - 1, 0));
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
    if (currentPage === 'home') {
      return <Home message={translations[language].accueil} />;
    } else if (currentPage === 'course') {
      if (!selectedCourse) return null;

      const lesson = lessonsData.courses[selectedCourse].lessons[currentLessonIndex];
      const totalLessons = lessonsData.courses[selectedCourse].lessons.length;

      return (
        <LessonCard
          lesson={lesson}
          courseTitle={lessonsData.courses[selectedCourse].title[language]}
          language={language}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
          translations={translations[language].lesson}
          currentLessonIndex={currentLessonIndex}
          totalLessons={totalLessons}
        />
      );
    } else if (currentPage === 'courses') {
      return <div className="courses">{renderCourseCards()}</div>;
    }
  };

  appeler  {renderContent()}
*/
  return (
    <div className="app">
      <Navbar />
      <div className="content">
      
      </div>
      <Footer footerText={translations[language].footer} />
    </div>
  );
};

export default AppContent;
