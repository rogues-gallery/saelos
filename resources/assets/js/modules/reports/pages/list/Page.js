import React from 'react';
import PropTypes from 'prop-types';
import { fetchReports, fetchReport } from "../../service";

class Page extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchReports())
  }

  render() {
    return (
      <div className="container">
        {this.props.reports.map(report => <Report key={report.id} report={report} dispatch={this.props.dispatch} />)}
      </div>
    )
  }
}

Page.propTypes = {
  reports: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Report = ({ report, dispatch }) => {
  return (
    <div className="report" onClick={() => dispatch(fetchReport(report.id))}>
      {report.name}
    </div>
  );
}

Report.propTypes = {
  report: PropTypes.object.isRequired
};

export default Page;