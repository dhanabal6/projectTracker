import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { Table, TableBody, TableRow, TableRowColumn } from "material-ui/Table";
import { RaisedButton, Dialog } from "material-ui";
import forms from "../forms";
import { validate } from "../../logic/timesheet";
import {
  addTimesheet,
  editTimesheet,
  fetchTasks,
  fetchProjectData
} from "../../routines";

class TimesheetForm extends Component {
  constructor(props) {
    super(props);
    this.state = { timesheet: [] };
  }

  componentDidMount() {
    this.props.fetchProjectData();
  }

  addTimesheetForm = values => {
    console.dir(values);
    const data = {
      projectName: values.projectName,
      taskName: values.taskName,
      spendTime: values.spendTime,
      taskCompletion: values.taskCompletion
    };
    this.setState({ timesheet: [...this.state.timesheet, data] });
    this.props.reset();
  };

  timesheetsFormSubmit = () => {
    console.log(this.state.timesheet);
    const date = {};
    const currentDate = this.props.dateValue;
    date[currentDate] = this.state.timesheet;
    const data = {
      timesheet: date
    };
    console.log(data);
    const id = this.props.match.params.timesheetId;
    if (id === "new") {
      this.props.addTimesheet(data);
    } else {
      this.props.editTimesheet({ id, data });
    }
  };

  handleSelectChange = (selectedItem, data) => {
    const item = selectedItem.currentTarget.value;
    var projectData = data.find(val => {
      return val.name == item;
    });
    this.props.fetchTasks(projectData._id);
  };

  render() {
    const { data } = this.props.projects;
    const { tasks } = this.props.tasks;
    const { timesheet } = this.state;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if (this.props.isPopup) {
      this.props.history.push("/timesheet");
    }
    return (
      <Dialog
        title={
          <div className="popheader">
            Timesheet Create{" "}
            <span className="close" onClick={this.props.handleClose}>
              X
            </span>{" "}
          </div>
        }
        modal={false}
        autoScrollBodyContent={true}
        open={true}
      >
        <form onSubmit={handleSubmit(this.addTimesheetForm.bind(this))}>
          <div className="mainform">
            <Table>
              <TableBody displayRowCheckbox={false}>
                {timesheet.map(item => (
                  <TableRow>
                    <TableRowColumn>{item.projectName}</TableRowColumn>
                    <TableRowColumn>{item.taskName}</TableRowColumn>
                    <TableRowColumn>{item.spendTime}</TableRowColumn>
                    <TableRowColumn>{item.taskCompletion}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Field
              name="projectName"
              component={forms.Select}
              label="Project Name"
              ref="projectName"
              onChange={selectedItem =>
                this.handleSelectChange(selectedItem, data)
              }
            >
              <option />
              {data.map(item => <option>{item.name}</option>)}
            </Field>
            <Field
              name="taskName"
              component={forms.Select}
              label="Task Name"
              ref="taskName"
            >
              <option />
              {this.props.tasks.map(taskName => (
                <option>{taskName.name}</option>
              ))}
            </Field>
            <Field
              name="spendTime"
              component={forms.Text}
              label="Spend Time"
              ref="spendTime"
            />
            <Field
              name="taskCompletion"
              component={forms.Text}
              label="Task Completion In %"
              ref="taskCompletion"
            />
          </div>
          <RaisedButton
            type="button"
            label="Save"
            primary={true}
            onClick={() => this.timesheetsFormSubmit()}
            className="button"
          />
          <RaisedButton
            type="submit"
            label="Add More"
            primary={true}
            disabled={pristine || submitting}
            className="button"
          />
          <RaisedButton
            type="reset"
            label="Cancel"
            secondary={true}
            className="button"
            disabled={pristine || submitting}
            onClick={reset}
          />
          {this.props.isUpdating && (
            <span className="valid-green"> Updating... </span>
          )}
        </form>
      </Dialog>
    );
  }
}

const filter_array = test_array => {
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

TimesheetForm = reduxForm({
  form: "timesheets",
  validate
})(TimesheetForm);

export default withRouter(
  connect(
    (state, props) => {
      const timesheetsData = state.timesheets.data;
      let datas;
      timesheetsData.map(item =>
        filter_array(item.timesheet).map(data => {
          Object.keys(data).map((val, index) => {
            return (datas = data[val]);
          });
        })
      );
      if (datas) {
        console.log("1");
        return {
          tasks: state.tasks.data,
          projects: state.projects,
          isUpdating: state.timesheets.updating,
          isPopup: state.timesheets.popup,
          initialValues: datas.find(
            (timesheets, i) =>
              timesheets.taskCompletion === props.match.params.timesheetId
          )
        };
      } else {
        console.log("2");
        return {
          tasks: state.tasks.data,
          projects: state.projects,
          isUpdating: state.timesheets.updating,
          isPopup: state.timesheets.popup,
          initialValues: state.timesheets.data.find(
            timesheets => timesheets._id === props.match.params.timesheetId
          )
        };
      }
    },
    { addTimesheet, editTimesheet, fetchTasks, fetchProjectData }
  )(TimesheetForm)
);
