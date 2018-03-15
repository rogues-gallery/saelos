import { connect } from 'react-redux';
import Page from './Page';
import {
	getOpportunities,
	getPaginationForOpportunities,
	isStateDirty,
	getSearchStringForOpportunities,
	getFirstOpportunityId,
  isInEdit
} from '../store/selectors'

export default connect(state => ({
  opportunities: getOpportunities(state),
  isDirty: isStateDirty(state),
  pagination: getPaginationForOpportunities(state),
  searchString: getSearchStringForOpportunities(state),
  firstOpportunityId: getFirstOpportunityId(state),
  inEdit: isInEdit(state)
}))(Page);