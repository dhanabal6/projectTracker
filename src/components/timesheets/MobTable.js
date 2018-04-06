import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from 'material-ui';

class MobTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: -1
    };
  }

  handleOpen = index => {
    this.setState({ index });
  };

  handleClose = () => {
    this.setState({ index: -1 });
  };

  render() {
    const { index } = this.state;
    let currentItem = {};
    if (index !== -1) {
      currentItem = this.props.mobTimetableData[index];
    }
    return (
      <div>
        <p className="name-mob">Project Name</p>
        <ul>
          {this.props.mobTimetableData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.projectName}
            </li>
          ))}
        </ul>
        <Dialog
          title={
            <div>
              Timesheet Details<span
                className="close"
                onClick={this.handleClose}
              >
                X
              </span>{" "}
            </div>
          }
          modal={false}
          autoScrollBodyContent={true}
          open={index !== -1}
        >
          <div className="tableDetail">
            <ul>
              <li>Project Name:</li>
              <li>Task Name:</li>
              <li>Hours Spent:</li>
              <li>Task Completion in %:</li>
              <li />
            </ul>
            <ul>
              <li>{currentItem.projectName}</li>
              <li>{currentItem.taskName}</li>
              <li>{currentItem.spendTime}</li>
              <li>{currentItem.taskCompletion}</li>
              <li>
                <Link
                  to={"/timesheet/" + currentItem._id}
                  onClick={() => this.props.handleOpen()}
                >
                  Edit
                </Link>
              </li>
              <li>
                <Link to={"/" + currentItem._id}>Manage Task</Link>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MobTable;
