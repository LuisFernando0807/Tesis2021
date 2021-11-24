import React, { useState } from 'react';
// import iconoAyudaSvg from '../assets/icono_ayuda 1.svg';

import './styles/Profile.scss'

function Profile(props) {
  const [user] = useState(localStorage.user == null ? null : JSON.parse(atob(localStorage.user)));
  return (
        <div className="profile-section">
              <strong className="">CARGO: {user.cargo_descripcion}</strong>
              <strong>AREA: {user.aro_descripcion}</strong>
          </div>
    );
}

export default Profile;