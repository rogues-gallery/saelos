import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactReducer from './contacts';
import taskReducer from './tasks';
import memberReducer from './members';
import projectReducer from './projects';
import authReducer from './auth';
import accountReducer from './accounts';
import opportunityReducer from "./opportunities";
import stageReducer from './stages';

export default combineReducers({
    form: formReducer,
    contactState: contactReducer,
    taskState: taskReducer,
    memberState: memberReducer,
    projectState: projectReducer,
    authState: authReducer,
    accountState: accountReducer,
    opportunityState: opportunityReducer,
    stageState: stageReducer
});
