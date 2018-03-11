import { connect } from 'react-redux';
import Page from './Page';
import {
	getContacts, 
	getPaginationForContacts,
	isStateDirty,
	getSearchStringForContacts,
	getFirstContactId
} from '../../contacts/store/selectors'

export default connect(state => ({
  contacts: getContacts(state),
  isDirty: isStateDirty(state),
  pagination: getPaginationForContacts(state),
  searchString: getSearchStringForContacts(state),
  firstContactId: getFirstContactId(state)
}))(Page);