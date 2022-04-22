import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import style from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <div className={style.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
