import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './Header.module.scss';

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <nav className={style.headerMenu}>
          <ul className={style.menuList}>
            <li>
              <NavLink to="/" className={style.menuLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={style.menuLink}>
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
