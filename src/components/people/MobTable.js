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
      currentItem = this.props.mobPeopleData[index];
    }
    return (
      <div>
        <p className="name-mob">Name</p>
        <ul>
          {this.props.mobPeopleData.map((items, i) => (
            <li className="data-mob" onClick={() => this.handleOpen(i)}>
              {items.name}
            </li>
          ))}
        </ul>
        <Dialog
          title={
            <div>
              People Details<span className="close" onClick={this.handleClose}>
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
              <li>Profile Image:</li>
              <li>Name:</li>
              <li>Email Id:</li>
              <li>Designation:</li>
              <li>SkillSet:</li>
              <li />
            </ul>
            <ul>
              <li>
                <img
                  src={"/" + currentItem.profileImage}
                  alt="profileimg"
                  height="100px"
                />
              </li>
              <li>{currentItem.name}</li>
              <li>{currentItem.emailId}</li>
              <li>{currentItem.designation}</li>
              <li>{currentItem.skillSet}</li>
              <li>
                <Link
                  to={"/people/" + currentItem._id}
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
