import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Create from "material-ui/svg-icons/content/create";

class TaskTable extends Component {
  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Task Name</TableHeaderColumn>
            <TableHeaderColumn>Task Points</TableHeaderColumn>
            <TableHeaderColumn>Task Status</TableHeaderColumn>
            <TableHeaderColumn>Assigned To</TableHeaderColumn>
            <TableHeaderColumn />
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.taskData.map(item => (
            <TableRow>
              <TableRowColumn>{item.name}</TableRowColumn>
              <TableRowColumn>{item.points}</TableRowColumn>
              <TableRowColumn>{item.status}</TableRowColumn>
              <TableRowColumn>{item.assignedTo}</TableRowColumn>
              <TableRowColumn>
                <Link
                  to={"/" + item.projectId + "/" + item._id}
                  onClick={() => this.props.handleOpen()}
                >
                  <Create color={"#262626"} />
                </Link>
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default TaskTable;
