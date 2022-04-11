import React from 'react';
import Form from '../../components/Form/Form';
import UserCard from '../../components/UserCard/UserCard';

import style from './FormPage.module.scss';

type UserCardModel = {
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
  country: string;
  photo: string;
  agree: boolean;
};

type FormPageState = {
  formValues: UserCardModel[];
};

type FormPageProps = Record<string, never>;

class FormPage extends React.Component<FormPageProps, FormPageState> {
  constructor(props: FormPageProps) {
    super(props);
    this.state = {
      formValues: [],
    };
    this.setFormValues = this.setFormValues.bind(this);
  }

  setFormValues(data: UserCardModel) {
    this.setState({
      formValues: [...this.state.formValues, data],
    });
  }

  render() {
    return (
      <div data-testid="form-page">
        <Form setFormValues={this.setFormValues} />
        <div className={style.userCards} data-testid="user-cards">
          {this.state.formValues &&
            this.state.formValues.map((item, index) => <UserCard key={index} {...item} />)}
        </div>
      </div>
    );
  }
}

export default FormPage;