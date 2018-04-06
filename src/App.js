import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Projects from './containers/Projects';
import Tasks from './containers/Tasks';
import People from './containers/People';
import Timesheets from './containers/Timesheets';
import Reports from './containers/Reports';
import HomePage from './containers/HomePage';
import Navigation from './components/Navigation';
import { userInfo } from './routines';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00bc8e',
    accent1Color: '#dc3545'
  }
});

class App extends Component {
  componentWillMount() {
    this.props.userInfo();
  }

  render() {
    const { userId } = this.props;
    if (!userId) {
      return <div className="fullLoading bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>;
    } else if (userId === 'guest') {
      return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <BrowserRouter>
            <Route path="/" component={HomePage} />
          </BrowserRouter>
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <BrowserRouter>
          <div className="App">
            <Navigation />
            <Switch>
              <Route path="/projects" component={Projects} />
              <Route path="/people" component={People} />
              <Route path="/timesheet" component={Timesheets} />
              <Route path="/reports" component={Reports} />
              <Route path="/:projectId" component={Tasks} />
              <Route path="/" component={Projects} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  (state, props) => ({
    userId: state.user.data._id
  }),
  { userInfo }
)(App);
