import React from 'react';

import style from './UserCard.module.scss';

type UserCardProps = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  country: string;
  photo: string;
  agree: boolean;
};

type UserCardState = Record<string, never>;

class UserCard extends React.Component<UserCardProps, UserCardState> {
  render() {
    return (
      <div className={style.userCard} data-testid="user-card">
        <img src={`${this.props.photo}`} className={style.userImg} />
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>First Name:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.firstName}</div>
        </div>
        <hr></hr>
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>Last Name:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.lastName}</div>
        </div>
        <hr></hr>
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>Birth Date:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.birthDate}</div>
        </div>
        <hr></hr>
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>Gender:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.gender}</div>
        </div>
        <hr></hr>
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>Country:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.country}</div>
        </div>
        <hr></hr>
        <div className={style.row}>
          <div className={`${style.col} ${style.userTitle}`}>Agree:</div>
          <div className={`${style.col} ${style.userText}`}>{this.props.agree.toString()}</div>
        </div>
      </div>
    );
  }
}

export default UserCard;
