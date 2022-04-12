import React from 'react';

import style from './Spinner.module.scss';

class Spinner extends React.Component {
  render() {
    return (
      <div className={style.spinnerWrapper}>
        <div className={style.spinner}></div>
      </div>
    );
  }
}

export default Spinner;
