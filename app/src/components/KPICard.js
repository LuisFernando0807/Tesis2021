import React from "react";
// import iconoAyudaSvg from '../assets/icono_ayuda 1.svg';

import "./styles/KPICard.scss";

function KPICard(props) {
    const {number, text} = props;
  return (
    <li className="kpi-card">
      <strong className="number">{number}</strong>
      <strong className="text">{text}</strong>
    </li>
  );
}

export default KPICard;
