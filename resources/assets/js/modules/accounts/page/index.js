import { connect } from 'react-redux';
import Page from './Page';
import { getAccounts, isStateDirty } from '../store/selectors'

export default connect(state => ({
  accounts: getAccounts(state),
  isDirty: isStateDirty(state)
}))(Page);