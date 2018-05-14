import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FlatButton, RaisedButton } from "material-ui";
import moment from "moment";

import MobTable from "../components/timesheets/MobTable";
import TimesheetTable from "../components/timesheets/TimesheetTable";
import TimesheetForm from "../components/timesheets/TimesheetForm";
import DateForm from "../components/timesheets/DateForm";
import Day from "../components/timesheets/Day";

import { fetchTimesheets } from "../routines";

class Timesheets extends Component {
  constructor(props) {
    super(props);
    var dateObj = new Date();
    var momentObj = moment(dateObj);
    var data = momentObj.format("YYYY-MM-DD");
    this.state = {
      isPopupOpen: false,
      index: -1,
      date: data,
      timesheetView: "dayView"
    };
  }

  componentDidMount() {
    const date = this.state.date;
    this.props.fetchTimesheets(date);
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/timesheet");
  };

  showDateForm = data => {
    this.dateValue(data);
  };

  dateValue = date => {
    this.setState({ date });
  };

  dayValue = (val, e) => {
    console.log(val);
    this.dateValue(val);
    this.props.fetchTimesheets(val);
  };

  viewWeekString = () => {
    this.setState({ timesheetView: "weekView" });
  };

  viewDayString = () => {
    this.setState({ timesheetView: "dayView" });
  };

  render() {
    if (this.props.timesheets.loading) {
      return (
        <div className="Loading bouncing-loader">
          <div />
          <div />
          <div />
        </div>
      );
    }
    const { index, timesheetView } = this.state;
    const { data } = this.props.timesheets;
    let dateVal = this.state.date;
    let now = new Date(dateVal);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let day = days[now.getDay()];
    let numDay = now.getDate();
    let month = months[now.getMonth()];
    let dayOfWeek = now.getDay();

    let startDate = new Date(dateVal);
    startDate.setDate(numDay - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(dateVal);
    endDate.setDate(numDay + (6 - dayOfWeek));
    endDate.setHours(0, 0, 0, 0);

    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      dateArray.push({
        date: moment(currentDate).format("YYYY-MM-DD"),
        day: moment(currentDate).format("ddd")
      });
      currentDate = moment(currentDate).add(1, "days");
    }

    return (
      <div className="page">
        <div className="headingTop">
          <h3>Timesheets</h3>
          <Link to="/timesheet/new">
            <FlatButton
              label="Create Timesheets"
              primary={true}
              onClick={this.handleOpen}
            />
          </Link>
        </div>
        <div className="section-sides">
          <div>
            <div className="timeline-top">
              <div className="date-header">
                <p>{month}</p>
                <p>{numDay}</p>
                <p>{day}</p>
              </div>
              <div className="date-section">
                <Day
                  dateVal={dateVal}
                  viewWeekString={this.viewWeekString}
                  viewDayString={this.viewDayString}
                />
                <DateForm showDateForm={this.showDateForm} />
              </div>
            </div>
            <Route
              path="/timesheet/:timesheetId"
              render={() => (
                <TimesheetForm
                  handleClose={this.handleClose}
                  data={index === -1 ? {} : data[index]}
                  dateValue={this.state.date}
                  timesheetsFormSubmit={this.timesheetsFormSubmit}
                />
              )}
            />
            {timesheetView === "dayView" ? (
              <div className="table">
                <div className="day-timesheet">
                  {dateArray.map(val => {
                    return (
                      <RaisedButton
                        type="submit"
                        backgroundColor="#eee"
                        label={val.day}
                        value={val.date}
                        className={val.day === day ? "cdateBtn" : "dateBtn"}
                        onClick={this.dayValue.bind(this, val.date)}
                      />
                    );
                  })}
                </div>
                <TimesheetTable
                  timesheetsData={data}
                  handleOpen={this.handleOpen}
                />
              </div>
            ) : (
              <div className="table">
                {dateArray.map(val => {
                  return (
                    <div>
                      <p>{val.day}</p>
                      <p>{val.date}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mobtable">
              <MobTable mobTimetableData={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    timesheets: state.timesheets
  }),
  { fetchTimesheets }
)(withRouter(Timesheets));
