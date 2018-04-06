import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { RaisedButton } from 'material-ui';
import forms from './forms';
import { validate } from '../logic/login';
import { forgotPassword } from '../routines';

class ForgotPasswordForm extends Component {
  forgotPasswordFormSubmit = values => {
    const data = {
      emailId: values.emailId
    };
    this.props.forgotPassword(data);
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="indexform">
        <div className="formwrapper">
          <div className="forgot">
            <div className="formHeader">
              <h3>Forgot Password</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.forgotPasswordFormSubmit.bind(this))}
            >
              <Field name="emailId" component={forms.Text} label="Email" />
              <RaisedButton
                type="submit"
                label="Reset Password"
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

ForgotPasswordForm = reduxForm({
  form: "forgot",
  validate
})(ForgotPasswordForm);

export default withRouter(
  connect((state, props) => {}, { forgotPassword })(ForgotPasswordForm)
);
