import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { FlatButton } from 'material-ui';

import MobTable from '../components/projects/MobTable';
import ProjectTable from '../components/projects/ProjectTable';
import ProjectForm from '../components/projects/ProjectForm';
import { fetchProjects } from '../routines';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
    };
  }

  componentDidMount() {
    this.props.fetchProjects();
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/projects");
  };

  render() {
    if (this.props.projects.loading) {
      return <div className="Loading bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>;
    }
    const { index } = this.state;
    const { data } = this.props.projects;
    return (
      <div className="page">
        <div className="headingTop">
          <h3>Projects</h3>
          <Link to="/projects/new">
            <FlatButton
              label="Create Projects"
              primary={true}
              onClick={this.handleOpen}
            >
            </FlatButton>
          </Link>
        </div>
        <div className="section-sides">
          <div>
        <Route
          path="/projects/:projectId"
          render={() => (
            <ProjectForm
              handleClose={this.handleClose}
              data={index === -1 ? {} : data[index]}
              projectFormSubmit={this.projectFormSubmit}
            />
          )}
        />
        <div className="table">
          <ProjectTable projectData={data} handleOpen={this.handleOpen} />
        </div>
        <div className="mobtable">
          <MobTable
            mobProjectData={data}
          />
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    projects: state.projects
  }),
  { fetchProjects }
)(withRouter(Projects));
