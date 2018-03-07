import { connect } from 'react-redux';
import Page from './Page';
import { getContacts, isStateDirty } from '../store/selectors'

export default connect(state => ({
  contacts: getContacts(state),
  isDirty: isStateDirty(state)
}))(Page);