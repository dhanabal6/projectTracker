import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";
import Create from "material-ui/svg-icons/content/create";

class TimesheetTable extends Component {
  filter_array = test_array => {
    var index = -1,
      arr_length = test_array ? test_array.length : 0,
      resIndex = -1,
      result = [];
    while (++index < arr_length) {
      var value = test_array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  };

  render() {
    console.log(this.props.timesheetsData);
    return (
      <div>
        {}
        <div>
          {this.props.timesheetsData.map(item =>
            this.filter_array(item.timesheet).map(data => {
              let completedPoints = 0;
              return (
                <div>
                  <Table>
                    <TableBody displayRowCheckbox={false}>
                      {this.props.isUpdating && (
                        <span className="valid-green"> loading... </span>
                      )}
                      {Object.keys(data).map((val, index) =>
                        data[val].map((value, index) => {
                          console.log(value);
                          completedPoints += value.spendTime;
                          console.log(completedPoints);
                          return (
                            <TableRow>
                              <TableRowColumn>
                                {value.projectName}
                              </TableRowColumn>
                              <TableRowColumn>{value.taskName}</TableRowColumn>
                              <TableRowColumn>{value.spendTime}</TableRowColumn>
                              <TableRowColumn>
                                {value.taskCompletion}
                              </TableRowColumn>
                              <TableRowColumn>
                                <Link
                                  to={
                                    "/timesheet/" +
                                    index +
                                    "/" +
                                    value.timesheetId
                                  }
                                  onClick={() => this.props.handleOpen()}
                                >
                                  <Create color={"#262626"} />
                                </Link>
                              </TableRowColumn>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    (state, props) => ({
      isUpdating: state.timesheets.updating
    }),
    {}
  )(TimesheetTable)
);
