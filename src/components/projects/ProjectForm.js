import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import { RaisedButton, Dialog } from "material-ui";

import forms from "../forms";
import { validate } from "../../logic/project";
import ManageTeam from "./ManageTeam";
import { addProject, editProject } from "../../routines";

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: (props.initialValues && props.initialValues.userList) || []
    };
  }

  onAddPerson = person => {
    this.setState({ people: [...this.state.people, person] });
  };

  onRemovePerson = person => {
    const index = this.state.people.indexOf(person);
    const { people } = this.state;
    this.setState({
      people: [...people.slice(0, index), ...people.slice(index + 1)]
    });
  };

  projectFormSubmit = values => {
    const data = {
      name: values.name,
      description: values.description,
      userList: this.state.people
    };
    const id = this.props.match.params.projectId;
    if (id === "new") {
      this.props.addProject(data);
    } else {
      this.props.editProject({ id, data });
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    if (this.props.isPopup) {
      this.props.history.push("/projects");
    }
    return (
      <Dialog
        title={
          <div className="popheader">
            New Project<span
              className="close"
              onClick={this.props.handleClose}
            >
              X
            </span>
          </div>
        }
        modal={false}
        open={true}
      >
        <form onSubmit={handleSubmit(this.projectFormSubmit.bind(this))}>
          <div className="form">
            <div className="mainform leftcol">
              <Field name="name" component={forms.Text} label="Name" />
              <Field
                name="description"
                component={forms.TextArea}
                label="Description"
              />
            </div>
            <div className="rightcol">
              <p>Manage Team</p>
              <ManageTeam
                people={this.state.people}
                onAdd={this.onAddPerson}
                onRemove={this.onRemovePerson}
              />
            </div>
          </div>
            <RaisedButton
              type="submit"
              label="submit"
              disabled={pristine || submitting}
              primary={true}
              className="button"
            />
            <RaisedButton
              type="reset"
              label="ReSet"
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

ProjectForm = reduxForm({
  form: "project",
  validate
})(ProjectForm);

export default withRouter(
  connect(
    (state, props) => ({
      isUpdating: state.tasks.updating,
      isPopup: state.projects.popup,
      initialValues: state.projects.data.find(
        project => project._id === props.match.params.projectId
      )
    }),
    { addProject, editProject }
  )(ProjectForm)
);
