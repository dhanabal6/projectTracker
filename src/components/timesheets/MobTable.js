import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dialog } from "material-ui";

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

  filter_array = test_array => {
    var index = -1,
      arr_length = test_array ? test_array.length : 0,
      resIndex = -1,
      result = [];
    while (++index < arr_length) {
      var value = test_array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  };

  render() {
    const { index } = this.state;
    let currentItem = {};
    if (index !== -1) {
      this.filter_array(this.props.mobTimetableData[index].timesheet).map(
        data =>
          Object.keys(data).map(val =>
            data[val].forEach((value, index) => {
              currentItem = value;
            })
          )
      );
    }
    return (
      <div>
        <p className="name-mob">Project Name</p>
        <ul>
          {this.props.mobTimetableData.map((item, i) =>
            this.filter_array(item.timesheet).map(data =>
              Object.keys(data).map(val =>
                data[val].map((value, index) => (
                  <li className="data-mob" onClick={() => this.handleOpen(i)}>
                    {value.projectName}
                  </li>
                ))
              )
            )
          )}
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
                  to={"/timesheet/" + index + "/" + currentItem.timesheetId}
                  onClick={() => this.props.handleOpen()}
                >
                  Edit
                </Link>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MobTable;
