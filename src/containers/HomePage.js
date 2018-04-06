import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";

import LogIn from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';

class HomePage extends Component {
  constructor(props) {
    super(props);
    const location = this.props.location.pathname;
    const currentUrl = location.split("/");
    const res = currentUrl[1];
    this.state = {
      currentView: res === "resetPassword" ? "" : "login"
    };
  }

  changeForm = (name) => {
     this.setState({currentView: name})
  }
  render() {
    const { currentView } = this.state;
    return (
      <div className="homePage">
        <div className="homebtns">
          <div onClick={() => {this.changeForm('login')}}>
            Login
          </div>
          <div onClick={() => {this.changeForm('register')}}
          >
            Register
          </div>
          <div onClick={() => {this.changeForm('forgotPassword')}}>
            Forgot Password
          </div>
        </div>
        {
          (currentView === "login") && (
            <LogIn onSubmit={this.loginFormSubmit} />
          )
        }
        {
          (currentView === "register") && (
            <Register onSubmit={this.registerFormSubmit} />
          )
        }
        {
          (currentView === "forgotPassword") && (
            <ForgotPassword onSubmit={this.forgotPasswordFormSubmit} />
          )
        }
        <Route
          path="/resetPassword/:token"
          render={() => <ResetPassword resetFormSubmit={this.resetPasswordFormSubmit} />}
        />
      </div>
    );
  }
}

export default withRouter(HomePage);
