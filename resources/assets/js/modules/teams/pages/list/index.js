import { connect } from 'react-redux';
import Page from './Page';
import { getTeams } from '../../store/selectors'

export default connect(state => ({
  teams: getTeams(state)
}))(Page);