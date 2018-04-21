import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
  Tabs,
  Tab,
  Toolbar,
  ListItem,
  Avatar,
  MenuItem,
  IconMenu,
  IconButton
} from 'material-ui';
import { connect } from 'react-redux';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Menu from 'material-ui/svg-icons/navigation/menu';
import { userInfo } from '../routines';
import { logout } from '../routines';

class Navigation extends Component {
  componentDidMount() {
    this.props.userInfo();
  }
  logout = () => {
    this.props.logout();
  };

  render() {
    const { userData } = this.props;
    return (
      <Toolbar className="toolbar">
      <header>
        <div className="nav-left">
          <div className="avatar">
            <Avatar />
          </div>
          <p className="logo-name">
            <Link className="logo-link" to="/">
              Project Tracker
            </Link>
          </p>
        </div>
        <div className="nav-right">
          <div className="menu-tab">
            <Tabs
              onChange={this.changeTab}
              className="tabs"
              initialSelectedIndex={-1}
              inkBarStyle={{ background: "#fff" }}
            >
              <Tab
                className="tab"
                value={0}
                label="Project"
                containerElement={<Link to="/projects" />}
              />
              {/*             <Tab className='tab' value={0} label="People" containerElement={<Link to="/people"/>} />
*/}{" "}
              <Tab
                className="tab"
                value={1}
                label="Timesheet"
                containerElement={<Link to="/timesheet" />}
              />
              <Tab
                className="tab"
                value={2}
                label="Report"
                containerElement={<Link to="/reports" />}
              />
            </Tabs>
          </div>
          <IconMenu
            iconButtonElement={
              <IconButton className="user-icon">
                <AccountCircle color={"#fff"} />
              </IconButton>
            }
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            targetOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem primaryText={userData.name} />
            <MenuItem onClick={this.logout} primaryText="Sign out" />
          </IconMenu>
          <div className="menu-bar">
            <IconMenu
              iconButtonElement={
                <IconButton className="user-icon">
                  <Menu color={"#fff"} />
                </IconButton>
              }
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
            >
              <MenuItem
                primaryText="Project"
                containerElement={<Link to="/projects" />}
              />
              <MenuItem
                primaryText="Timesheet"
                containerElement={<Link to="/timesheet" />}
              />
              <MenuItem
                primaryText="Report"
                containerElement={<Link to="/reports" />}
              />
            </IconMenu>
          </div>
        </div>
        </header>
      </Toolbar>
    );
  }
}

export default connect(
  (state, props) => ({
    userData: state.user.data
  }),
  { userInfo, logout }
)(Navigation);
