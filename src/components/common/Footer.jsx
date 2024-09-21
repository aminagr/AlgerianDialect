import React from 'react';
import '../../styles/Footer.css';

const Footer = ({ footerText })=> {
    return (
        <footer className="footer">
        <p>{footerText}</p>
        </footer>
    );
};

export default Footer;


