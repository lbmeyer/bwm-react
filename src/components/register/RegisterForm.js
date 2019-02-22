import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from '../shared/form/BwmInput';
import { BwmResError } from '../shared/form/BwmResError';

const RegisterForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="username"
        // component="input"
        label="Username"
        component={BwmInput}
        type="text"
        className="form-control"
      />

      <Field
        name="email"
        label="Email"
        type="email"
        component={BwmInput}
        className="form-control"
      />

      <Field
        name="password"
        label="Password"
        component={BwmInput}
        type="password"
        className="form-control"
      />

      <Field
        name="passwordConfirmation"
        label="Password Confirmation"
        component={BwmInput}
        type="password"
        className="form-control"
      />
      <div>
        <button
          className="btn btn-bwm btn-form"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Submit
        </button>
        <BwmResError errors={errors} />
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values.username && values.username.length < 4) {
    errors.username = 'Username min length is 4 characters';
  }

  if (!values.email) {
    errors.email = 'Please enter an email';
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter password confirmation';
  }

  if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords must be the same';
  }

  return errors;
};

export default reduxForm({
  form: 'registerForm', // a unique identifier for this form
  validate
})(RegisterForm);
