import { connect } from 'react-redux';
import Page from './Page';
import { getCompanies, isStateDirty } from '../store/selectors'

export default connect(state => ({
  companies: getCompanies(state),
  isDirty: isStateDirty(state)
}))(Page);