import React, { useState } from 'react';
import '../../styles/Navbar.css';
import LanguageSelector from './LanguageSelector'; 
import { useAppContext } from '../../context/AppContext'; // Import the context

const Navbar = () => {
    const { language } = useAppContext(); // Get current language from context
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Accueil');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
        setIsOpen(false);
    };

    // Translations for the navbar
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
            <div className="logo">Learn Algerian</div>
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
                <li className={activeItem === 'Accueil' ? 'active' : ''} onClick={() => handleItemClick('Accueil')}>
                    {menuTranslations[language].home}
                </li>
                <li className={activeItem === 'Quiz' ? 'active' : ''} onClick={() => handleItemClick('Quiz')}>
                    {menuTranslations[language].quiz}
                </li>
                <li className={activeItem.startsWith('Cours') ? 'active' : ''} onClick={() => handleItemClick('Cours')}>
                    {menuTranslations[language].courses}
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
                        <li className={activeItem === 'Cours A' ? 'active' : ''} onClick={() => handleItemClick('Cours A')}>
                            {menuTranslations[language].courseA}
                        </li>
                        <li className={activeItem === 'Cours B' ? 'active' : ''} onClick={() => handleItemClick('Cours B')}>
                            {menuTranslations[language].courseB}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
