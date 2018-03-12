import { connect } from 'react-redux';
import Page from './Page';
import { 
	getReports,
	getPaginationForReports,
	isStateDirty,
	getSearchStringForReports,
	getFirstReportId
} from '../store/selectors'

export default connect(state => ({
  reports: getReports(state),
  isDirty: isStateDirty(state),
  pagination: getPaginationForReports(state),
  searchString: getSearchStringForReports(state),
  firstReportId: getFirstReportId(state)
}))(Page);