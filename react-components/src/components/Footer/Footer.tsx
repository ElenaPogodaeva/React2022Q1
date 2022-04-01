import React from 'react';

import style from './Footer.module.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className={style.footerContainer}>
          <a
            href="https://rs.school/js/"
            className={style.rsschool}
            target="_blank"
            rel="noreferrer"
          ></a>
          <span>2022</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
