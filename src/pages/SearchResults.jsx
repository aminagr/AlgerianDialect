// src/components/SearchResults.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import useSearch from '../hooks/useSearch';

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, translations } = useAppContext();
    
    // Récupérer le terme de recherche depuis les paramètres de l'URL
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get('term') || '';

    // Utiliser le hook useSearch pour obtenir les résultats de recherche
    const searchResults = useSearch(searchTerm, language);

    const handleResultClick = (courseId, lessonId) => {
        navigate(`/courses/${courseId}/${lessonId}`);
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
