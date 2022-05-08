import React from 'react';
import Form from '../../components/Form/Form';
import UserCard from '../../components/UserCard/UserCard';
import { addUser } from '../../features/formSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UserCardModel } from '../../types/types';

import style from './FormPage.module.scss';

export const FormPage = () => {
  const { formValues } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const setValues = (user: UserCardModel) => {
    dispatch(addUser(user));
  };

  return (
    <div data-testid="form-page">
      <Form setValues={setValues} />
      <div className={style.userCards} data-testid="user-cards">
        {formValues && formValues.map((item, index) => <UserCard key={index} {...item} />)}
      </div>
    </div>
  );
};

export default FormPage;
