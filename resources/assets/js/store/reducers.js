import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactReducer from '../modules/contacts/store/reducer';
import taskReducer from '../modules/tasks/store/reducer';
import memberReducer from '../modules/members/store/reducer';
import authReducer from '../modules/auth/store/reducer';
import accountReducer from '../modules/accounts/store/reducer';
import opportunityReducer from "../modules/opportunities/store/reducer";
import stageReducer from '../modules/stages/store/reducer';
import teamReducer from "../modules/teams/store/reducer";
import reportReducer from "../modules/reports/store/reducer";
import contactFlyoutReducer from "../modules/contact-flyout/store/reducer";
import opportunityFlyoutReducer from "../modules/opportunity-flyout/store/reducer";
import accountFlyoutReducer from "../modules/account-flyout/store/reducer";
import customFieldsReducer from "../modules/custom-fields/store/reducer";
import repFlyoutReducer from "../modules/rep-flyout/store/reducer";
import noteReducer from "../modules/notes/store/reducer";
import documentReducer from "../modules/documents/store/reducer";
import workflowReducer from "../modules/workflows/store/reducer";

export default combineReducers({
    form: formReducer,
    contactState: contactReducer,
    taskState: taskReducer,
    memberState: memberReducer,
    projectState: projectReducer,
    authState: authReducer,
    accountState: accountReducer,
    opportunityState: opportunityReducer,
    stageState: stageReducer,
    teamState: teamReducer,
    reportState: reportReducer,
    contactFlyoutState: contactFlyoutReducer,
    opportunityFlyoutState: opportunityFlyoutReducer,
    accountFlyoutState: accountFlyoutReducer,
    customFieldsState: customFieldsReducer,
    repFlyoutState: repFlyoutReducer,
    notesState: noteReducer,
    documentsState: documentReducer,
    workflowState: workflowReducer
});
