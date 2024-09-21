import React, { useState } from 'react';
import '../../styles/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Accueil'); // Set default active item

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item); // Set the active item
        setIsOpen(false); // Close the menu after selection on mobile
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="logo">Learn Algerian</div>
            <select className="language-select">
                <option value="en">🇬🇧 English</option>
                <option value="ar">🇸🇦 العربية</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="ru">🇷🇺 Русский</option>
                <option value="es">🇪🇸 Español</option>
                <option value="it">🇮🇹 Italiano</option>
                
               
            </select>
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
                <li className={activeItem === 'Accueil' ? 'active' : ''} onClick={() => handleItemClick('Accueil')}>Accueil</li>
                <li className={activeItem === 'Quiz' ? 'active' : ''} onClick={() => handleItemClick('Quiz')}>Quiz</li>
                <li className={activeItem.startsWith('Cours') ? 'active' : ''} onClick={() => handleItemClick('Cours')}>
                    Cours
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ marginLeft: '5px', verticalAlign: 'middle' }} // Adjust icon position
                    >
                        <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="2" />
                    </svg>
                    <ul className="dropdown">
                        <li className={activeItem === 'Cours A' ? 'active' : ''} onClick={() => handleItemClick('Cours A')}>Cours A</li>
                        <li className={activeItem === 'Cours B' ? 'active' : ''} onClick={() => handleItemClick('Cours B')}>Cours B</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
