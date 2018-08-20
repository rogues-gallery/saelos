import { combineReducers } from "redux";
import authReducer from "../modules/auth/store/reducer";
import contactReducer from "../modules/contacts/store/reducer";
import usersReducer from "../modules/users/store/reducer";
import companyReducer from "../modules/companies/store/reducer";
import opportunityReducer from "../modules/opportunities/store/reducer";
import analyticsReducer from "../modules/analytics/store/reducer";
import teamReducer from "../modules/teams/store/reducer";
import stageReducer from "../modules/stages/store/reducer";
import statusReducer from "../modules/statuses/store/reducer";
import activityReducer from "../modules/activities/store/reducer";
import fieldReducer from "../modules/fields/store/reducer";
import tagReducer from "../modules/tags/store/reducer";
import roleReducer from "../modules/roles/store/reducer";
import importReducer from "../modules/imports/store/reducer";

export default combineReducers({
  auth: authReducer,
  contactState: contactReducer,
  userState: usersReducer,
  companyState: companyReducer,
  opportunityState: opportunityReducer,
  analyticsState: analyticsReducer,
  teamState: teamReducer,
  stageState: stageReducer,
  statusState: statusReducer,
  activityState: activityReducer,
  fieldState: fieldReducer,
  tagState: tagReducer,
  roleState: roleReducer,
  importState: importReducer
});
