import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { RaisedButton } from 'material-ui';
import forms from './forms';
import { validate } from '../logic/login';
import { login } from '../routines';

class LoginForm extends Component {
  loginFormSubmit = values => {
    const data = {
      emailId: values.emailId,
      password: values.password
    };
    console.log(data);
    if (values.checker == true) {
      localStorage.setItem("rememberMe", JSON.stringify(data));
    }

    this.props.login(data);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="indexform">
        <div className="formwrapper">
          <div className="login">
            <div className="formHeader">
              <h3>Login</h3>
            </div>
            <form
              className="formBody"
              name="form"
              onSubmit={handleSubmit(this.loginFormSubmit.bind(this))}
            >
              <Field name="emailId" component={forms.Text} label="Email" />
              <Field name="password" component={forms.Password} label="Password" />
              <Field
                name="checker"
                component={forms.Checkbox}
                label="Keep Me Login"
              />
              <RaisedButton
                type="submit"
                label="Login"
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

LoginForm = reduxForm({
  form: "login",
  validate
})(LoginForm);

export default withRouter(
  connect(
    (state, props) => {
      const obj = JSON.parse(localStorage.getItem("rememberMe")) || {};
      return {
        initialValues: {
          emailId: obj.emailId,
          password: obj.password
        }
      };
    },
    { login }
  )(LoginForm)
);
