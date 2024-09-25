import React from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import { useNavigate } from 'react-router-dom';
import lessonsData from '../data/lessons.json';

const Courses = () => {
  const { language } = useAppContext();
  const navigate = useNavigate(); // Use navigate hook

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`); // Navigate to LessonCard directly
  };

  const renderCourseCards = () => {
    return Object.keys(lessonsData.courses).map((courseId, index) => (
      <CourseCard
        key={index}
        title={lessonsData.courses[courseId].title[language]}
        onClick={() => handleCourseClick(courseId)} // Pass courseId to handleCourseClick
      />
    ));
  };

  return (
    <div className="courses-page">
      <div className="courses">{renderCourseCards()}</div>
    </div>
  );
};

export default Courses;
