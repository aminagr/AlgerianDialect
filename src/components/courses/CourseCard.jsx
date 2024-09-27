import React from 'react';
import '../../styles/Courses.css';

const CourseCard = ({ title, onClick }) => {
  return (
    <div className="course-card" onClick={onClick}>
      <h2>{title}</h2>
    </div>
  );
};

export default CourseCard;