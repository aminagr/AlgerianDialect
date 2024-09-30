import React from 'react';
import '../../styles/Footer.css';
import { useAppContext } from '../../context/AppContext';
const Footer = () => {
    const { language, translations } = useAppContext();
  
    return (
      <footer className="footer">
     <p>  {translations[language].footer} <a href="https://github.com/aminagr/AlgerianDialect" target="_blank" rel="noopener noreferrer">GitHub</a>.
      
     </p> 
      </footer>
    );
  };

export default Footer;


