import React, { useContext } from 'react';
import Form from '../../components/Form/Form';
import UserCard from '../../components/UserCard/UserCard';
import { AppContext } from '../../context/context';
import { ActionType } from '../../context/reducers';
import { UserCardModel } from '../../types/types';

import style from './FormPage.module.scss';

export const FormPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const formValues = state.formValues;

  const setValues = (user: UserCardModel) => {
    dispatch({
      type: ActionType.AddUser,
      payload: { user },
    });
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
