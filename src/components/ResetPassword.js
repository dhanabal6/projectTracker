import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';

import forms from './forms';
import { validate } from '../logic/login';
import { resetPassword } from '../routines';

class ResetPasswordForm extends Component {
  constructor(props) {
    super(props);
    const token = this.props.match.params.token;
  }

  resetPasswordFormSubmit = values => {
    const data = {
      password: values.password
    };
    const token = this.props.match.params.token;
    this.props.resetPassword({ token, data });
  };
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="indexform">
        <div className="formwrapper">
          <div className="reset">
            <div className="formHeader">
              <h3>Reset Password</h3>
            </div>
            <form
              className="formBody"
              onSubmit={handleSubmit(this.resetPasswordFormSubmit.bind(this))}
            >
              <Field
                name="password"
                component={forms.Text}
                label="New Password"
              />
              <RaisedButton
                type="submit"
                label="Update Password"
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

ResetPasswordForm = reduxForm({
  form: "reset",
  validate
})(ResetPasswordForm);

export default withRouter(
  connect((state, props) => ({}), { resetPassword })(ResetPasswordForm)
);
