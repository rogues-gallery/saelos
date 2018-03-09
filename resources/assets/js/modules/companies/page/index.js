import { connect } from 'react-redux';
import Page from './Page';
import { 
	getCompanies, 
	getPaginationForCompanies,
	isStateDirty,
	getSearchStringForCompanies,
	getFirstCompanyId
} from '../store/selectors'

export default connect(state => ({
  companies: getCompanies(state),
  isDirty: isStateDirty(state),
 	pagination: getPaginationForCompanies(state),
  searchString: getSearchStringForCompanies(state),
  firstCompanyId: getFirstCompanyId(state)
}))(Page);