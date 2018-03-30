import { combineReducers } from 'redux'
import authReducer from '../modules/auth/store/reducer'
import contactReducer from '../modules/contacts/store/reducer'
import userReducer from '../modules/user/store/reducer'
import companyReducer from '../modules/companies/store/reducer'
import opportunityReducer from '../modules/opportunities/store/reducer'
import analyticsReducer from '../modules/analytics/store/reducer'
import workflowReducer from '../modules/workflows/store/reducer'
import teamReducer from '../modules/teams/store/reducer'
import stageReducer from '../modules/stages/store/reducer'
import statusReducer from '../modules/statuses/store/reducer'
import activityReducer from '../modules/activities/store/reducer'
import fieldReducer from '../modules/fields/store/reducer'
import tagReducer from '../modules/tags/store/reducer'

export default combineReducers({
  auth: authReducer,
  contactState: contactReducer,
  user: userReducer,
  companyState: companyReducer,
  opportunityState: opportunityReducer,
  analyticsState: analyticsReducer,
  workflowState: workflowReducer,
  teamState: teamReducer,
  stageState: stageReducer,
  statusState: statusReducer,
  activityState: activityReducer,
  fieldState: fieldReducer,
  tagState: tagReducer
});
