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
          {this.props.reportData.map(reportData => (
            <TableRow>
              <TableRowColumn>{reportData.projectName}</TableRowColumn>
              <TableRowColumn>{reportData.taskCount}</TableRowColumn>
              <TableRowColumn>{reportData.completeTaskCount}</TableRowColumn>
              <TableRowColumn>{reportData.pointsCount}</TableRowColumn>
              <TableRowColumn>{reportData.completePointsCount}</TableRowColumn>
              <TableRowColumn>{reportData.status}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}

export default ReportTable;
