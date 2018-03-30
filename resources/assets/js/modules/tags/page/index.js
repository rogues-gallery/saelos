import { connect } from 'react-redux'
import Page from './Page'
import {getTags, getPaginationForTags, getSearchStringForTags} from "../store/selectors";

export default connect(state => ({
  tags: getTags(state),
  pagination: getPaginationForTags(state),
  searchString: getSearchStringForTags(state),
}))(Page)