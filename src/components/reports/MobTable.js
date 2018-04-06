import React, { Component } from 'react';
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
      currentItem = this.props.mobReportData[index];
    }
    return (
      <div>
        <p className="name-mob">Project Name</p>
        <ul>
          {this.props.mobReportData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.projectName}
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
              <li>{currentItem.projectName}</li>
              <li>{currentItem.taskCount}</li>
              <li>{currentItem.completeTaskCount}</li>
              <li>{currentItem.pointsCount}</li>
              <li>{currentItem.completePointsCount}</li>
              <li>{currentItem.status}</li>
            </ul>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default MobTable;
