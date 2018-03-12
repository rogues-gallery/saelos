import { combineReducers } from 'redux'
import authReducer from '../modules/auth/store/reducer'
import contactReducer from '../modules/contacts/store/reducer'
import userReducer from '../modules/user/store/reducer'
import companyReducer from '../modules/companies/store/reducer'
import opportunityReducer from '../modules/opportunities/store/reducer'
import reportReducer from '../modules/reports/store/reducer'
import workflowReducer from '../modules/workflows/store/reducer'
import teamReducer from '../modules/teams/store/reducer'
import stageReducer from '../modules/stages/store/reducer'

export default combineReducers({
  auth: authReducer,
  contactState: contactReducer,
  user: userReducer,
  companyState: companyReducer,
  opportunityState: opportunityReducer,
  reportState: reportReducer,
  workflowState: workflowReducer,
  teamState: teamReducer,
  stageState: stageReducer
});
