import React from 'react';
import iconoAyudaSvg from '../assets/icono_ayuda 1.svg';

import './styles/Header.scss'

function Header(props) {
    return (
        <div className="header">
            <h3 className="header-title">PORTAL DE MESA DE AYUDA TI</h3>
            <div className="header-help">
                <p className="header-help-text">Ayuda&nbsp;</p>
                <img className="header-help-icon" src={iconoAyudaSvg} alt="" height="63" />
            </div>
        </div>
    );
}

export default Header;