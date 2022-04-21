import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import UserCard from '../../components/UserCard/UserCard';

import style from './FormPage.module.scss';

type UserCardModel = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  country: string;
  photo: FileList;
  agree: boolean;
};

export const FormPage = () => {
  const [formValues, setFormValues] = useState<UserCardModel[]>([]);

  const setValues = (data: UserCardModel) => {
    setFormValues((state) => [...state, data]);
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
