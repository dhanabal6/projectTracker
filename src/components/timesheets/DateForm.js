import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

import { fetchTimesheets } from "../../routines";
class DateForm extends Component {
  constructor(props) {
    super(props);
    var dateObj = new Date();
    var finalDate = moment(dateObj);
    this.state = {
      focused: false,
      date: finalDate
    };
  }

  onDateChange = date => {
    this.setState({ date });
    if (date) {
      const momentDate = date;
      const data = momentDate.format("YYYY-MM-DD");
      this.props.fetchTimesheets(data);
      this.props.showDateForm(data);
    }
  };

  render() {
    const { date, focused } = this.state;
    return (
      <SingleDatePicker
        id="date_input"
        date={date}
        onDateChange={this.onDateChange}
        focused={focused}
        onFocusChange={({ focused }) => {
          this.setState({ focused });
        }}
        showDefaultInputIcon={true}
        daySize={40}
        noBorder
        isOutsideRange={() => false}
        numberOfMonths={1}
      />
    );
  }
}

export default withRouter(
  connect((state, props) => ({}), { fetchTimesheets })(DateForm)
);
