import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { RaisedButton } from "material-ui";

class Day extends Component {
  dayForm = () => {
    this.props.viewDayString();
  };

  WeekForm = dates => {
    console.log("week");
    let now = new Date(dates);
    let dayOfWeek = now.getDay();
    let numDay = now.getDate();

    let start = new Date(now);
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);

    let end = new Date(now);
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);
    console.log(start.getDay());
    this.props.viewWeekString();
    return [start, end];
  };

  render() {
    let dates = this.props.dateVal;
    return (
      <div>
        <RaisedButton
          type="submit"
          label="Day"
          backgroundColor="#eee"
          onClick={() => this.dayForm()}
        />
        <RaisedButton
          type="submit"
          label="Week"
          backgroundColor="#eee"
          value={dates}
          onClick={this.WeekForm.bind(this, dates)}
        />
      </div>
    );
  }
}

export default Day;
