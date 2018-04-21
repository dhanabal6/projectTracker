import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { RaisedButton, Dialog } from 'material-ui';
import forms from '../forms';
import { validate } from '../../logic/task';
import { addTask, editTask, fetchUser } from '../../routines';

class TaskForm extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  taskFormSubmit = values => {
    console.dir(values);
    const data = {
      name: values.name,
      description: values.description,
      points: values.points,
      status: values.status,
      assignedTo: values.assignedTo
    };
    const id = this.props.match.params.taskId;
    const projectId = this.props.match.params.projectId;
    if (id === "new") {
      this.props.addTask({ projectId, data });
    } else {
      this.props.editTask({ projectId, id, data });
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if (this.props.isPopup) {
      this.props.history.push("/" + `${this.props.match.params.projectId}`);
    }
    const { userData } = this.props;
    return (
      <Dialog
        title={
          <div className="popheader">
            Tasks Create<span
              className="close"
              onClick={this.props.handleClose}
            >
              X
            </span>
          </div>
        }
        modal={false}
        autoScrollBodyContent={true}
        open={true}
      >
        <form onSubmit={handleSubmit(this.taskFormSubmit.bind(this))}>
          <div className="mainform">
            <Field
              name="name"
              component={forms.Text}
              label="Task Name"
            />
            <Field
              name="description"
              component={forms.TextArea}
              label="Task Description"
              multiLine={true}
              rows={2}
            />
            <Field
              name="points"
              component={forms.Text}
              label="Tasks points"
            />
            <Field name="status" component={forms.Select} label="Tasks Status">
              <option />
              <option>BackLog</option>
              <option>Active</option>
              <option>InProgress</option>
              <option>Complete</option>
              <option>Approved</option>
              <option>ReOpen</option>
            </Field>
           <Field
              name="assignedTo"
              component={forms.Select}
              label="AssignedTo User"
            >
              <option />
              {this.props.userData.map(item =>
                 <option>{item.emailId}</option>
              )}
            </Field>
          </div>
          <RaisedButton
            type="submit"
            disabled={pristine || submitting}
            label="Save"
            primary={true}
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
            )
          }
        </form>
      </Dialog>
    );
  }
}

TaskForm = reduxForm({
  form: "task",
  validate
})(TaskForm);

export default withRouter(
  connect(
    (state, props) => ({
      userData: state.user.userData,
      isUpdating: state.tasks.updating,
      isPopup: state.tasks.popup,
      initialValues: state.tasks.data.find(
        task => task._id === props.match.params.taskId
      )
    }),
    { addTask, editTask, fetchUser }
  )(TaskForm)
);
