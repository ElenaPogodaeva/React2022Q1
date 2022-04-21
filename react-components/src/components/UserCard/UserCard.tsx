import React from 'react';

import style from './UserCard.module.scss';

type UserCardModel = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  country: string;
  photo: FileList;
  agree: boolean;
};

export const UserCard = ({
  firstName,
  lastName,
  birthDate,
  gender,
  country,
  photo,
  agree,
}: UserCardModel) => {
  const src = photo[0] ? URL.createObjectURL(photo[0]) : require(`../../assets/img/avatar.jpg`);

  return (
    <div className={style.userCard} data-testid="user-card">
      <img src={src} className={style.userImg} />
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>First Name:</div>
        <div className={`${style.col} ${style.userText}`}>{firstName}</div>
      </div>
      <hr></hr>
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>Last Name:</div>
        <div className={`${style.col} ${style.userText}`}>{lastName}</div>
      </div>
      <hr></hr>
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>Birth Date:</div>
        <div className={`${style.col} ${style.userText}`}>{birthDate}</div>
      </div>
      <hr></hr>
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>Gender:</div>
        <div className={`${style.col} ${style.userText}`}>{gender}</div>
      </div>
      <hr></hr>
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>Country:</div>
        <div className={`${style.col} ${style.userText}`}>{country}</div>
      </div>
      <hr></hr>
      <div className={style.row}>
        <div className={`${style.col} ${style.userTitle}`}>Agree:</div>
        <div className={`${style.col} ${style.userText}`}>{agree.toString()}</div>
      </div>
    </div>
  );
};

export default UserCard;
