import { connect } from 'react-redux';
import Page from './Page';
import { getAccounts } from '../store/selectors'

export default connect(state => ({
  accounts: getAccounts(state)
}))(Page);