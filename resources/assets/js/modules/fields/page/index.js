import { connect } from 'react-redux'
import Page from './Page'
import {getFields, getPaginationForFields, getSearchStringForFields} from "../store/selectors";

export default connect(state => ({
  fields: getFields(state),
  pagination: getPaginationForFields(state),
  searchString: getSearchStringForFields(state),
}))(Page)