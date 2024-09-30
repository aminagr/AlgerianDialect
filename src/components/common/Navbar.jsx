import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
    const { language } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 
    const { courseId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleSubMenu = () => {
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const getActiveItem = () => {
        switch (location.pathname) {
            case '/quiz':
                return 'Quiz';
            case '/courses':
                return 'Cours';
            case `/courses/${courseId}`:
                return 'Cours'; 
            default:
                return '';
        }
    };

    const activeItem = getActiveItem();

    const menuTranslations = {
        en: { home: 'Home', quiz: 'Quiz', courses: 'Courses', grammar: 'Grammar', conjugation: 'Conjugation', vocabulary: 'Vocabulary' },
        fr: { home: 'Accueil', quiz: 'Quiz', courses: 'Cours', grammar: 'Grammaire', conjugation: 'Conjugaison', vocabulary: 'Vocabulaire' },
        es: { home: 'Inicio', quiz: 'Cuestionario', courses: 'Cursos', grammar: 'Gramática', conjugation: 'Conjugación', vocabulary: 'Vocabulario' },
        it: { home: 'Home', quiz: 'Quiz', courses: 'Lezioni', grammar: 'Grammatica', conjugation: 'Coniugazione', vocabulary: 'Vocabolario' },
        ru: { home: 'Главная', quiz: 'Викторины', courses: 'Уроки', grammar: 'Грамматика', conjugation: 'Спряжение', vocabulary: 'Словарь' },
        ar: { home: 'الرئيسية', quiz: 'الأسئلة', courses: 'الدروس', grammar: 'قواعد', conjugation: 'صرف', vocabulary: 'مفردات' },
    };

    const handleLinkClick = (path, isLogoClick = false) => {
        if (location.pathname === path) {
            window.location.reload();
        } else {
            navigate(path);
        }
        if (!isLogoClick) {
            toggleMenu();
        }
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="logo" onClick={() => handleLinkClick('/', true)}>
                Learn Algerian
            </div>
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
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/" onClick={() => handleLinkClick('/')} className="link">{menuTranslations[language].home}</Link>
                </li>
                <li className={activeItem.startsWith('Cours') ? 'active' : ''}>
    <span onClick={toggleSubMenu} className="link">
        {menuTranslations[language].courses}
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ marginLeft: '8px', verticalAlign: 'middle' }}>
            <path d="M0 3.5L5 8.5L10 3.5H0Z" fill="white" />
        </svg>
    </span>
    {isSubMenuOpen && (
        <ul className="dropdown">
            <li>
                <Link to="/courses/grammaire" onClick={() => handleLinkClick('/courses/grammaire')} className="link">{menuTranslations[language].grammar}</Link>
            </li>
            <li>
                <Link to="/courses/conjugaison" onClick={() => handleLinkClick('/courses/conjugaison')} className="link">{menuTranslations[language].conjugation}</Link>
            </li>
            <li>
                <Link to="/courses/vocabulaire" onClick={() => handleLinkClick('/courses/vocabulaire')} className="link">{menuTranslations[language].vocabulary}</Link>
            </li>
        </ul>
    )}
</li>
                <li className={activeItem === 'Quiz' ? 'active' : ''}>
                    <Link to="/quiz" onClick={() => handleLinkClick('/quiz')} className="link">{menuTranslations[language].quiz}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
