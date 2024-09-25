import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import lessonsData from '../data/lessons.json';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const { language, translations } = useAppContext();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchTerm = params.get('term');
        handleSearch(searchTerm);
    }, [location]);

    const handleSearch = (searchTerm) => {
        const results = [];
        Object.keys(lessonsData.courses).forEach(courseId => {
            lessonsData.courses[courseId].lessons.forEach(lesson => {
                const words = Object.values(lesson.word);
                if (words.some(word => word.toLowerCase().includes(searchTerm.toLowerCase()))) {
                    results.push({ courseId, lesson });
                }
            });
        });
        setSearchResults(results);
    };

    const handleResultClick = (courseId, lessonId) => {
        navigate(`/courses/${courseId}`); 
    };

    return (
        <div className="search-results-page">
            <h1>{translations[language].searchResultsTitle}</h1>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((result, index) => (
                        <li 
                            key={index} 
                            onClick={() => handleResultClick(result.courseId, result.lesson.id)} 
                            style={{ cursor: 'pointer' }} 
                        >
                            <strong>{result.lesson.word.dz}</strong>: {result.lesson.word[language]}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{translations[language].noResultsFound}</p>
            )}
        </div>
    );
};

export default SearchResults;
