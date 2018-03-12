import React from 'react';
import PropTypes from 'prop-types';
import { fetchReports, fetchReport } from "../../../service";
import moment from 'moment'

class List extends React.Component {
  constructor(props) {
    super(props)

    this._onScroll = this._onScroll.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }

  componentWillMount() {
    const { reports, dispatch, searchString } = this.props

    if (reports.length === 0) {
      dispatch(fetchReports({page: 1, searchString})) 
    }
  }
  
  _onKeyPress(event) {
    const { target, charCode } = event

    if (charCode !== 13) {
      return
    }

    event.preventDefault()

    this._submit(target)
  }

  _onScroll(event) {
    const { target } = event
    const { dispatch, pagination, searchString } = this.props
    const currentPosition = target.scrollTop + target.offsetHeight

    if ((currentPosition + 300) >= target.scrollHeight) {
      dispatch(fetchReports({page: pagination.current_page + 1, searchString}))
    }
  }


  render() {
    const { reports, dispatch, searchString, firstReportId } = this.props
    const activeIndex = parseInt(this.context.router.route.match.params.id) || firstReportId

    return (
      <div className="col list-panel border-right">
        <div className="px-4 pt-4 bg-white border-bottom">
          <form>
            <input
            type="search"
            className="form-control ds-input"
            id="search-input"
            placeholder="Search..."
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-owns="algolia-autocomplete-listbox-0"
            dir="auto"
            style={{position:"relative", verticalAlign:"top"}}
            onKeyPress={this._onKeyPress}
            defaultValue={searchString}
            />
          </form>
          <div className="micro-text row text-center pt-3 pb-2"><div className="text-dark col"><b>Active</b></div> <div className="text-muted col"><b>All</b></div></div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
        {reports.map(report => <Report key={report.id} report={report} dispatch={dispatch} router={this.context.router} activeID={activeIndex} />)}
        </div>
      </div>
    )
  }
}

List.propTypes = {
  reports: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
};

List.contextTypes = {
  router: PropTypes.object
}

const Report = ({ report, dispatch, router, activeID }) => {
  const openCompanyRecord = (id) => {
    dispatch(fetchReport(report.id))
    router.history.push(`/reports/${id}`)
  }

  return (
    <div onClick={() => openReportRecord(report.id)}
    className={`list-group-item list-group-item-action align-items-start ${report.id === parseInt(activeID) ? ' active' : ''}`}>
      <span className="text-muted mini-text float-right">{moment(report.updated_at).fromNow()}</span>
      <h6 className="text-truncate pr-1">{report.name}</h6>
      <p>Secondary Detail</p>
      <p className="text-muted">Tertiary Information</p>
    </div>
  );
}

Report.propTypes = {
  report: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number.isRequired
}
export default List;