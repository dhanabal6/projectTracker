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
            let points = 0;
            let comPoints = 0;
            item.tasks.forEach( data => {
              points = data.points;
              pointsCount+=data.points;
              data.timeLog.forEach( value => {
                      // comPoints =  value.taskCompletion;
                      completedPoints+=value.taskCompletion;
                     })
            });
            console.log(points);
            // console.log(comPoints);

             const status = (completedPoints/pointsCount)*100;
             let statusValue = 0;
             if(isNaN(status)){
                statusValue = 0;
             } else {
                statusValue = Math.round(status);
             }
             let styel = {
              width: statusValue
             };

          return(<TableRow>
              <TableRowColumn>{item.name}</TableRowColumn>
              <TableRowColumn>{item.taskCount}</TableRowColumn>
              <TableRowColumn>{pointsCount}</TableRowColumn>
              <TableRowColumn>{completedPoints}</TableRowColumn>
              <TableRowColumn>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={statusValue}
                aria-valuemin="0" aria-valuemax="100" style={styel}>
                  {statusValue}%
                </div>
                </div>
            </TableRowColumn>
            </TableRow>);
          })}
        </TableBody>
      </Table>
    );
  }
}

export default ReportTable;
