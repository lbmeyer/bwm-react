import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from '../shared/form/BwmInput';
import { BwmResError } from '../shared/form/BwmResError';
import { required, minLength4 } from '../shared/form/validators';

const LoginForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="email"
        label="Email"
        type="email"
        className="form-control"
        component={BwmInput}
        validate={[required, minLength4]}
      />
      <Field
        name="password"
        label="Password"
        component={BwmInput}
        type="password"
        className="form-control"
        validate={[required]}
      />
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Submit
      </button>
    </form>
  );
};


export default reduxForm({
  form: 'loginForm', // a unique identifier for this form
})(LoginForm);
