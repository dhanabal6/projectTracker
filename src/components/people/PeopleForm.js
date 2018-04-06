import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';

import { RaisedButton, Dialog } from 'material-ui';
import forms from '../forms';
import { validate } from '../../logic/project';
import renderFileInput from '../forms/renderFileInput';
import { addPeople, editPeople } from '../../routines';

class PeopleForm extends Component {
  peopleFormSubmit = values => {
    console.dir(values);
    const data = {
      name: values.name,
      emailId: values.emailId,
      designation: values.designation,
      profileImage: values.profileImage,
      skillSet: values.skillSet
    };
    const id = this.props.match.params.peopleId;
    if (id === "new") {
      this.props.addPeople(data);
    } else {
      this.props.editPeople({ id, data });
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <Dialog
        title={
          <div>
            People Create{" "}
            <span className="close" onClick={this.props.handleClose}>
              X
            </span>{" "}
          </div>
        }
        modal={false}
        autoScrollBodyContent={true}
        open={true}
      >
        <form onSubmit={handleSubmit(this.peopleFormSubmit.bind(this))}>
          <div className="mainform">
            <Field
              name="name"
              component={forms.Text}
              label="Name"
            />
            <Field
              name="emailId"
              component={forms.Text}
              label="Email Id"
            />
            <Field
              name="designation"
              component={forms.Text}
              label="Designation"
            />
            <Field
              name="profileImage"
              component={renderFileInput}
              type="file"
            />
            <Field name="skillSet" component={forms.Text} label="Skillset" />
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
        </form>
      </Dialog>
    );
  }
}

PeopleForm = reduxForm({
  form: "peopleform",
  validate
})(PeopleForm);

export default withRouter(
  connect(
    (state, props) => ({
      initialValues: state.people.data.find(
        people => people._id === props.match.params.peopleId
      )
    }),
    { addPeople, editPeople }
  )(PeopleForm)
);
