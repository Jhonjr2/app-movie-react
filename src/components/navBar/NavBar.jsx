import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import '../css/navBar.css';
import img from '../../../public/logo.png';

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <img src={img} alt="Logo" />
      <ul className={showMenu ? 'show' : ''}>
        <li>
          <Link to="/" className="nav_link" onClick={closeMenu}>Movies</Link>
        </li>
        <li>
          <Link to="/series" className="nav_link" onClick={closeMenu}>Series</Link>
        </li>
        <li>
          <Link to="/my-list" className="nav_link" onClick={closeMenu}>My List</Link>
        </li>
      </ul>
      <FontAwesomeIcon icon={faBars} className="menu_icon" onClick={toggleMenu} />
      {showMenu && <div className="overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

export default NavBar;
