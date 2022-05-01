import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

export const Header = () => {
  return (
    <header className={style.header} data-testid="header">
      <div className={style.headerContainer}>
        <nav className={style.headerMenu}>
          <ul className={style.menuList}>
            <li>
              <NavLink to="/" className={style.menuLink} data-testid="home-link">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={style.menuLink} data-testid="about-link">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/form" className={style.menuLink} data-testid="form-link">
                Form
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
