import React from 'react';

import style from './Form.module.scss';

// type FormPageProps = {
//   nameInput: React.RefObject<HTMLInputElement>;
//   //onSearchBarChange: (value: string) => void;
// };
type FormProps = Record<string, never>;
type FormState = Record<string, never>;

class Form extends React.Component<FormProps, FormState> {
  private form: React.RefObject<HTMLFormElement>;
  private firstNameInput: React.RefObject<HTMLInputElement>;
  private lastNameInput: React.RefObject<HTMLInputElement>;
  private countrySelect: React.RefObject<HTMLSelectElement>;
  private birthDateInput: React.RefObject<HTMLInputElement>;
  private genderInput: React.RefObject<HTMLInputElement>;
  private fileInput: React.RefObject<HTMLInputElement>;
  private agreeInput: React.RefObject<HTMLInputElement>;

  constructor(props: FormProps) {
    super(props);
    this.form = React.createRef();
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.countrySelect = React.createRef();
    this.birthDateInput = React.createRef();
    this.genderInput = React.createRef();
    this.fileInput = React.createRef();
    this.agreeInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
  //   //this.setState({ searchValue: event.target.value });
  //   this.props.onSearchBarChange(event.target.value);
  // }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log({
      fname: (this.firstNameInput.current as HTMLInputElement).value,
      lname: (this.lastNameInput.current as HTMLInputElement).value,
      select: (this.countrySelect.current as HTMLSelectElement).value,
      date: (this.birthDateInput.current as HTMLInputElement).value,
      gender: (this.genderInput.current as HTMLInputElement).value,
      photo: (this.fileInput.current as HTMLInputElement).value,
      agree: (this.agreeInput.current as HTMLInputElement).checked,
    });
  }

  render() {
    return (
      <div data-testid="form-page" className={style.formWrapper}>
        <form className={style.form} onSubmit={this.handleSubmit} ref={this.form}>
          <label htmlFor="fname" className={style.formLabel}>
            First Name
            <input
              type="text"
              className={style.formInput}
              name="fname"
              ref={this.firstNameInput}
              placeholder="First name"
            />
          </label>
          <label htmlFor="lname" className={style.formLabel}>
            Last Name
            <input
              type="text"
              className={style.formInput}
              name="lname"
              ref={this.lastNameInput}
              placeholder="Last name"
            />
          </label>
          <label htmlFor="birthDate" className={style.formLabel}>
            Birth Date
            <input
              type="date"
              className={style.formInput}
              name="birthDate"
              ref={this.birthDateInput}
              placeholder="Birth date"
            />
          </label>
          <p className={style.radioWrapper}>
            Gender:
            <label>
              <input
                type="radio"
                name="gender"
                ref={this.genderInput}
                defaultValue="male"
                className={style.formRadio}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                ref={this.genderInput}
                defaultValue="female"
                className={style.formRadio}
              />
              Female
            </label>
          </p>
          <label htmlFor="country" className={style.formLabel}>
            Country
            <select name="country" ref={this.countrySelect} className={style.formSelect}>
              <option value="australia">Australia</option>
              <option value="canada">Canada</option>
              <option value="usa">USA</option>
            </select>
          </label>
          <label className={style.formLabel}>
            Profile picture
            <input type="file" name="photo" ref={this.fileInput} className={style.fileInput} />
          </label>
          <label htmlFor="agree" className={style.formLabel}>
            <input
              type="checkbox"
              className={style.formCheckbox}
              name="agree"
              ref={this.agreeInput}
            />
            I agree to the Terms and Conditions
          </label>
          <input className={style.formBtn} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
