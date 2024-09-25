import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
    const { language, courses } = useAppContext(); 
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const getActiveItem = () => {
        switch (location.pathname) {
            case '/quiz':
                return 'Quiz';
            case '/courses':
                return 'Cours';
            default:
                return 'Accueil';
        }
    };

    const activeItem = getActiveItem();

    const menuTranslations = {
        en: { home: 'Home', quiz: 'Quiz', courses: 'Courses' },
        fr: { home: 'Accueil', quiz: 'Quiz', courses: 'Cours' },
        es: { home: 'Inicio', quiz: 'Cuestionario', courses: 'Cursos' },
        it: { home: 'Home', quiz: 'Quiz', courses: 'Corsi' },
        ru: { home: 'Главная', quiz: 'Викторина', courses: 'Курсы' },
        ar: { home: 'الرئيسية', quiz: 'اختبار', courses: 'الدروس' },
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <Link to="/" className="logo">
                Learn Algerian
            </Link>
            <LanguageSelector />
            <div className="hamburger" onClick={toggleMenu}>
                {isOpen ? (
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M5 5L25 25M5 25L25 5" stroke="white" strokeWidth="3" />
                    </svg>
                ) : (
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M5 7H25M5 15H25M5 23H25" stroke="white" strokeWidth="3" />
                    </svg>
                )}
            </div>
            <ul className={`menu ${isOpen ? 'open' : ''}`}>
                <li className={activeItem === 'Accueil' ? 'active' : ''}>
                    <Link to="/" onClick={toggleMenu}>
                        {menuTranslations[language].home}
                    </Link>
                </li>
                <li className={activeItem === 'Quiz' ? 'active' : ''}>
                    <Link to="/quiz" onClick={toggleMenu}>
                        {menuTranslations[language].quiz}
                    </Link>
                </li>
                <li className={activeItem.startsWith('Cours') ? 'active' : ''}>
                    <Link to="/courses" onClick={toggleMenu}>
                        {menuTranslations[language].courses}
                    </Link>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ marginLeft: '5px', verticalAlign: 'middle' }}
                    >
                        <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="2" />
                    </svg>
                    <ul className="dropdown">
                        {Object.keys(courses).map(courseKey => (
                            <li key={courseKey} className={activeItem === courses[courseKey].title[language] ? 'active' : ''}>
                                <Link to={`/courses/${courseKey}`} onClick={toggleMenu}>
                                    {courses[courseKey].title[language]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
          
            </ul>
        </nav>
    );
};

export default Navbar;
