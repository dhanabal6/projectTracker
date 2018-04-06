import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, withRouter } from 'react-router-dom';
import { FlatButton } from 'material-ui';

import MobTable from '../components/tasks/MobTable';
import TaskTable from '../components/tasks/TaskTable';
import TaskForm from '../components/tasks/TaskForm';
import { fetchTasks } from '../routines';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1
    };
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.match.params.projectId);
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/" + `${this.props.match.params.projectId}`);
  };

  render() {
    if (this.props.tasks.loading) {
      return <div className="Loading bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>;
    }
    const { index } = this.state;
    const { data } = this.props.tasks;
    return (
      <div className="page">
        <div className="headingTop">
        <h3>Tasks</h3>
        <Link to={"/" + `${this.props.match.params.projectId}` + "/new"}>
              <FlatButton
                label="Create Tasks"
                primary={true}
                onClick={this.handleOpen}
              />
            </Link>
        </div>
        <div className="section-sides">
        <Route
          path="/:projectId/:taskId"
          render={() => (
            <TaskForm
              handleClose={this.handleClose}
              data={index === -1 ? {} : data[index]}
              taskFormSubmit={this.taskFormSubmit}
            />
          )}
        />
        <div className="table">
          <TaskTable taskData={data} handleOpen={this.handleOpen} />
        </div>
        <div className="mobtable">
          <MobTable
            mobTaskData={data}
          />
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tasks: state.tasks
  }),
  { fetchTasks }
)(withRouter(Tasks));
