import { connect } from 'react-redux';
import Page from './Page';
import {
	getActivities,
	getPaginationForActivities,
	getSearchStringForActivities,
} from '../../activities/store/selectors'

export default connect(state => ({
  activities: getActivities(state),
  pagination: getPaginationForActivities(state),
  searchString: getSearchStringForActivities(state),
}))(Page);