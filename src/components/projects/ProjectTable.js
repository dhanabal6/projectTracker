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
import Create from 'material-ui/svg-icons/content/create';

class ProjectTable extends Component {
  render() {
    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Points</TableHeaderColumn>
              <TableHeaderColumn>Completed Points</TableHeaderColumn>
              <TableHeaderColumn />
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.projectData.map(item => {
                let task = item.tasks;
                let totalPoints=0;
                let completedPoints=0;
                 task.forEach(each => {
                     totalPoints+=each.points;
                     each.timeLog.forEach( value => {
                      completedPoints+=value.taskCompletion
                     })
              });  
              return(
                <TableRow>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{totalPoints}</TableRowColumn>
                <TableRowColumn>{completedPoints}</TableRowColumn>
                <TableRowColumn>
                  <Link
                    to={"/projects/" + item._id}
                    onClick={() => this.props.handleOpen()}
                  >
                    <Create color={"#262626"} />
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={"/" + item._id}>Manage Task</Link>
                </TableRowColumn>
              </TableRow>
                )
            }
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ProjectTable;
