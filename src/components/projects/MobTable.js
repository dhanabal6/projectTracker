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
    let totalPoints=0;
    let completedPoints=0;
    console.log(this.props.mobProjectData);
    if (index !== -1) {
      currentItem = this.props.mobProjectData[index];
      let task = currentItem.tasks;
       task.forEach(each => {
           totalPoints+=each.points;
           each.timeLog.forEach( value => {
            completedPoints+=value.taskCompletion
           })
         });
    }
    return (
      <div>
        <p className="name-mob">Name</p>
        <ul>
          {this.props.mobProjectData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.name}
            </li>
          ))}
        </ul>
        <Dialog
          title={
            <div>
              Project Details<span className="close" onClick={this.handleClose}>
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
              <li>Name:</li>
              <li>Points:</li>
              <li>Completed Points:</li>
              <li />
              <li />
            </ul>
            <ul>
              <li>{currentItem.name}</li>
              <li>{totalPoints}</li>
              <li>{completedPoints}</li>
              <li>
                {" "}
                <Link
                  to={"/projects/" + currentItem._id}
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
