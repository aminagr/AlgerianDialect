import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import '../../styles/Navbar.css';
import LanguageSelector from './LanguageSelector'; 
import { useAppContext } from '../../context/AppContext'; 

const Navbar = () => {
    const { language } = useAppContext(); 
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
        en: {
            home: 'Home',
            quiz: 'Quiz',
            courses: 'Courses',
            courseA: 'Course A',
            courseB: 'Course B',
        },
        fr: {
            home: 'Accueil',
            quiz: 'Quiz',
            courses: 'Cours',
            courseA: 'Cours A',
            courseB: 'Cours B',
        },
        es: {
            home: 'Inicio',
            quiz: 'Cuestionario',
            courses: 'Cursos',
            courseA: 'Curso A',
            courseB: 'Curso B',
        },
        it: {
            home: 'Home',
            quiz: 'Quiz',
            courses: 'Corsi',
            courseA: 'Corso A',
            courseB: 'Corso B',
        },
        ru: {
            home: 'Главная',
            quiz: 'Викторина',
            courses: 'Курсы',
            courseA: 'Курс A',
            courseB: 'Курс B',
        },
        ar: {
            home: 'الرئيسية',
            quiz: 'اختبار',
            courses: 'الدورات',
            courseA: 'الدورة A',
            courseB: 'الدورة B',
        },
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <Link to="/" className="logo" onClick={toggleMenu}>
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
                        <li className={activeItem === 'Cours A' ? 'active' : ''}>
                            <Link to="/courses/courseA" onClick={toggleMenu}>
                                {menuTranslations[language].courseA}
                            </Link>
                        </li>
                        <li className={activeItem === 'Cours B' ? 'active' : ''}>
                            <Link to="/courses/courseB" onClick={toggleMenu}>
                                {menuTranslations[language].courseB}
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
