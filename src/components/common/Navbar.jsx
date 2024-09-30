import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/Navbar.css';
import LanguageSelector from './LanguageSelector';
import { useAppContext } from '../../context/AppContext';

const Navbar = () => {
    const { language } = useAppContext();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 
    const { courseId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
        en: { home: 'Home', quiz: 'Quiz', courses: 'Courses' },
        fr: { home: 'Accueil', quiz: 'Quiz', courses: 'Cours' },
        es: { home: 'Inicio', quiz: 'Cuestionario', courses: 'Cursos' },
        it: { home: 'Home', quiz: 'Quiz', courses: 'Lezioni' },
        ru: { home: 'Главная', quiz: 'Викторины', courses: 'Уроки' },
        ar: { home: 'الرئيسية', quiz: 'الأسئلة', courses: 'الدروس' },
    };

    const handleLinkClick = (path) => {
        if (location.pathname === path) {
            window.location.reload(); 
        } else {
            navigate(path);
        }
        toggleMenu(); 
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="logo" onClick={() => handleLinkClick('/')}>
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
                    <Link to="/courses" onClick={() => handleLinkClick('/courses')} className="link">{menuTranslations[language].courses}</Link>
                </li>
                <li className={activeItem === 'Quiz' ? 'active' : ''}>
                    <Link to="/quiz" onClick={() => handleLinkClick('/quiz')} className="link">{menuTranslations[language].quiz}</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
