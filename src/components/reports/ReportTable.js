import React, { Component } from 'react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class ReportTable extends Component {
  render() {
    console.log(this.props.reportData);
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Project Name</TableHeaderColumn>
            <TableHeaderColumn>Task Count</TableHeaderColumn>
            <TableHeaderColumn>Completed Task Count</TableHeaderColumn>
            <TableHeaderColumn>Points Count</TableHeaderColumn>
            <TableHeaderColumn>Completed Points Count</TableHeaderColumn>
            <TableHeaderColumn>Project status in %</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {this.props.reportData.map(item => {
            let pointsCount = 0;
            let completedPoints = 0;
            item.tasks.forEach( data => {
              pointsCount+=data.points;
              data.timeLog.forEach( value => {
                      completedPoints+=value.taskCompletion
                     })
            })
             console.log(pointsCount);
             console.log(completedPoints);
          return(<TableRow>
              <TableRowColumn>{item.name}</TableRowColumn>
              <TableRowColumn>{item.taskCount}</TableRowColumn>
              <TableRowColumn>{pointsCount}</TableRowColumn>
              <TableRowColumn>{completedPoints}</TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    );
  }
}

export default ReportTable;
