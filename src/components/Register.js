import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import forms from './forms';
import { validate } from '../logic/register';
import { register } from '../routines';

class RegisterForm extends Component {
  registerFormSubmit = values => {
    const data = {
      name: values.name,
      emailId: values.emailId,
      password: values.password
    };
    this.props.register(data);
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="indexform">
        <div className="formwrapper">
          <div className="regiter">
            <div className="formHeader">
              <h3>Register</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.registerFormSubmit.bind(this))}
            >
              <Field name="name" component={forms.Text} label="Name" />
              <Field name="emailId" component={forms.Text} label="Email" />
              <Field name="password" component={forms.Text} label="Password" />
              <RaisedButton
                type="submit"
                label="Register"
                disabled={pristine || submitting}
                primary={true}
                fullWidth={true}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm = reduxForm({
  form: "register",
  validate
})(RegisterForm);

export default withRouter(
  connect((state, props) => ({}), { register })(RegisterForm)
);
