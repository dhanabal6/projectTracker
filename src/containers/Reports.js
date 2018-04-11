import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ReportTable from '../components/reports/ReportTable';
import MobTable from '../components/reports/MobTable';
import { fetchReports } from '../routines';

class Reports extends Component {
 componentDidMount() {
    this.props.fetchReports();
  }
  render() {
    if (this.props.reports.loading) {
      return <div className="Loading bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>;
    }
    const { data } = this.props.reports;
    return (
      <div className="page">
        <h3>Reports</h3>
        <div className="table">
          <ReportTable  reportData={data}/>
        </div>
        <div className="mobtable">
          <MobTable mobReportData={data}/>
        </div>
      </div>
    );
  }
}


export default connect(
  state => ({
    reports: state.reports
  }),
  { fetchReports }
)(withRouter(Reports));
