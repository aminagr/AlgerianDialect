import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import lessonsData from '../data/lessons.json';

const useSearch = (searchTerm, language) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleSearch = () => {
    const options = {
      keys: ['lessons.word.dz', `lessons.word.${language}`],
      threshold: 0.3,
    };

    const coursesArray = Object.entries(lessonsData.courses).map(([courseId, course]) => ({
      courseId,
      ...course,
    }));

    const fuse = new Fuse(coursesArray, options);
    const results = fuse.search(searchTerm);

    // Filtrer pour les résultats exacts
    const exactResults = results.flatMap(result => 
      result.item.lessons.filter(lesson => 
        lesson.word[language].toLowerCase() === searchTerm.toLowerCase() ||
        lesson.word.dz.toLowerCase() === searchTerm.toLowerCase()
      ).map(lesson => ({ courseId: result.item.courseId, lesson }))
    );

    if (exactResults.length > 0) {
      setSearchResults(exactResults);
    } else {
      // Si aucun résultat exact, retourner les résultats similaires
      const lessonsResults = results.flatMap(result => 
        result.item.lessons.map(lesson => ({ courseId: result.item.courseId, lesson }))
      );
      setSearchResults(lessonsResults);
    }
  };

  return searchResults;
};

export default useSearch;
