import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import lessonsData from '../data/lessons.json';

// Fonction pour normaliser les chaînes en supprimant les accents
const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const useSearch = (searchTerm, language) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    // Calculer la longueur minimale basée sur un pourcentage
    const minLength = Math.max(2, Math.floor(searchTerm.length * 0.5));

    if (searchTerm.length < minLength) {
      setSearchResults([]);
      return;
    }

    const options = {
      keys: [`lessons.word.${language}`, 'lessons.word.dz'],
      threshold: 0.4, // Ajuster le seuil pour être plus permissif
      shouldSort: true,
      includeScore: true,
      findAllMatches: true,
      useExtendedSearch: true, // Pour une recherche plus robuste
    };

    const coursesArray = Object.entries(lessonsData.courses).map(([courseId, course]) => ({
      courseId,
      ...course,
    }));

    const fuse = new Fuse(coursesArray, options);

    const handleSearch = () => {
      const normalizedSearchTerm = normalizeString(searchTerm);
      const results = fuse.search(normalizedSearchTerm);

      const exactResults = results.flatMap(result =>
        result.item.lessons.filter(lesson => {
          return normalizeString(lesson.word[language]) === normalizedSearchTerm ||
                 normalizeString(lesson.word.dz) === normalizedSearchTerm;
        }).map(lesson => ({ courseId: result.item.courseId, lesson }))
      );

      if (exactResults.length > 0) {
        setSearchResults(exactResults);
      } else {
        const similarResults = results.flatMap(result =>
          result.item.lessons.filter(lesson => {
            const normalizedLessonWord = normalizeString(lesson.word[language]);
            return normalizedLessonWord.includes(normalizedSearchTerm) ||
                   normalizedLessonWord.split('').some(char => normalizedLessonWord.includes(normalizedSearchTerm));
          }).map(lesson => ({ courseId: result.item.courseId, lesson }))
        );

        setSearchResults(similarResults);
      }
    };

    const debounceSearch = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounceSearch);
  }, [searchTerm, language]);

  return searchResults;
};

export default useSearch;
