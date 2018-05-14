import React, { Component } from "react";
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

  render() {
    const { index } = this.state;
    let currentItem = {};
    let pointsCount = 0;
    let completedPoints = 0;
    let points = 0;
    let comPoints = 0;
    let statusValue = 0;
    let style = {};
    if (index !== -1) {
      currentItem = this.props.mobReportData[index];
      currentItem.tasks.forEach(data => {
        points = data.points;
        pointsCount += data.points;
        data.timeLog.forEach(value => {
          completedPoints += value.taskCompletion;
        });
      });
      const status = completedPoints / pointsCount * 100;
      if (isNaN(status)) {
        statusValue = 0;
      } else {
        statusValue = Math.round(status);
      }
      style = {
        width: statusValue
      };
    }
    return (
      <div>
        <p className="name-mob">Project Name</p>
        <ul>
          {this.props.mobReportData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.name}
            </li>
          ))}
        </ul>
        <Dialog
          title={
            <div>
              Report Details<span className="close" onClick={this.handleClose}>
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
              <li>Task Count:</li>
              <li>Completed Task Count:</li>
              <li>Points Count:</li>
              <li>Completed Points Count:</li>
              <li>Project status in %:</li>
            </ul>
            <ul>
              <li>{currentItem.name}</li>
              <li>{currentItem.taskCount}</li>
              <li>{pointsCount}</li>
              <li>{completedPoints}</li>
              <li>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={statusValue}
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={style}
                  >
                    {statusValue}%
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MobTable;
