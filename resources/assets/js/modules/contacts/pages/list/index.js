import { connect } from 'react-redux';
import Page from './Page';
import { getContacts } from '../../store/selectors'

export default connect(state => ({
  contacts: getContacts(state)
}))(Page);