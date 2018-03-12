import { connect } from 'react-redux'
import Page from './Page'
import {getStages, getPaginationForStages, getSearchStringForStages} from "../store/selectors";

export default connect(state => ({
  stages: getStages(state),
  pagination: getPaginationForStages(state),
  searchString: getSearchStringForStages(state),
}))(Page)