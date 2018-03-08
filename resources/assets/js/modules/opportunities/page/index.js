import { connect } from 'react-redux';
import Page from './Page';
import { getOpportunities, getPaginationForOpportunities, isStateDirty } from '../store/selectors'

export default connect(state => ({
  opportunities: getOpportunities(state),
  isDirty: isStateDirty(state),
  pagination: getPaginationForOpportunities(state)
}))(Page);