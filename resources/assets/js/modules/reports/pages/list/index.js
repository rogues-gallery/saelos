import { connect } from 'react-redux';
import Page from './Page';
import { getReports } from '../../store/selectors'

export default connect(state => ({
  reports: getReports(state)
}))(Page);