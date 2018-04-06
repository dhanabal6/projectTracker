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
      currentItem = this.props.mobProjectData[index];
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
              <li>{currentItem.totalPoints}</li>
              <li>{currentItem.completedPoints}</li>
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
