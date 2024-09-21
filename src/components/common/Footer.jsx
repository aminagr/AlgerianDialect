import React from 'react';
import '../../styles/Footer.css';
import { useAppContext } from '../../context/AppContext';
const Footer = () => {
    const { language, translations } = useAppContext();
  
    return (
      <footer className="footer">
        <p>{translations[language].footer}</p>
      </footer>
    );
  };

export default Footer;


