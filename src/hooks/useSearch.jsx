import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import lessonsData from '../data/lessons.json';

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const useSearch = (searchTerm) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    const minLength = Math.max(2, Math.floor(searchTerm.length * 0.5));

    if (searchTerm.length < minLength) {
      setSearchResults([]);
      return;
    }

    const options = {
      keys: Object.keys(lessonsData.courses).flatMap(courseId => {
        const lessons = lessonsData.courses[courseId].lessons;
        return lessons.map(lesson => [
          ...Object.keys(lesson.word).map(lang => `lessons.word.${lang}`)
        ]);
      }).flat(),
      threshold: 0.4,
      shouldSort: true,
      includeScore: true,
      findAllMatches: true,
      useExtendedSearch: true,
    };

    const coursesArray = Object.entries(lessonsData.courses).map(([courseId, course]) => ({
      courseId,
      ...course,
    }));

    const fuse = new Fuse(coursesArray, options);

    const normalizedSearchTerm = normalizeString(searchTerm);
    const results = fuse.search(normalizedSearchTerm);

    const matchedResults = results.flatMap(result =>
      result.item.lessons.filter(lesson => {
        return Object.values(lesson.word).some(word =>
          normalizeString(word).includes(normalizedSearchTerm)
        );
      }).map(lesson => ({ courseId: result.item.courseId, lesson }))
    );

    setSearchResults(matchedResults);
  }, [searchTerm]);

  return searchResults;
};

export default useSearch;
