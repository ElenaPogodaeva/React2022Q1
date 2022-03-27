import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

import style from './Layout.module.scss';

const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <Outlet />
      </main>
      <footer className="footer">footer</footer>
    </div>
  );
};

export default Layout;
