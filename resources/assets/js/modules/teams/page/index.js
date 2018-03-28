import { connect } from 'react-redux'
import Page from './Page'
import {getTeams, getPaginationForTeams, getSearchStringForTeams} from "../store/selectors";

export default connect(state => ({
  teams: getTeams(state),
  pagination: getPaginationForTeams(state),
  searchString: getSearchStringForTeams(state),
}))(Page)