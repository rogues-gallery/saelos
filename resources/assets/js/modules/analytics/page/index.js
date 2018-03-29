import { connect } from 'react-redux';
import Page from './Page';
import { getAnalytics } from '../store/selectors'

export default connect(state => ({
  analytics: getAnalytics(state),
}))(Page);