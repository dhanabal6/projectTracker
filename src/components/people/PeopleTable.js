import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class PeopleTable extends Component {
  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Profile Image</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email Id</TableHeaderColumn>
            <TableHeaderColumn>Designation</TableHeaderColumn>
            <TableHeaderColumn>SkillSet</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.peopleData.map(item => (
            <TableRow>
              <TableRowColumn>
                <img
                  src={"/" + item.profileImage}
                  alt="profileimg"
                  height="100px"
                />
              </TableRowColumn>
              <TableRowColumn>{item.name}</TableRowColumn>
              <TableRowColumn>{item.emailId}</TableRowColumn>
              <TableRowColumn>{item.designation}</TableRowColumn>
              <TableRowColumn>{item.skillSet}</TableRowColumn>
              <TableRowColumn>
                <Link
                  to={"/people/" + item._id}
                  onClick={() => this.props.handleOpen()}
                >
                  Edit
                </Link>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default PeopleTable;
