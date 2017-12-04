import { combineReducers } from 'redux';
import contactReducer from './contacts';
import taskReducer from './tasks';
import memberReducer from './members';
import projectReducer from './projects';
import authReducer from './auth';
import accountReducer from './accounts';
import { reducer as formReducer } from 'redux-form';
import opportunityReducer from "./opportunities";

export default combineReducers({
    contactState: contactReducer,
    taskState: taskReducer,
    memberState: memberReducer,
    projectState: projectReducer,
    authState: authReducer,
    form: formReducer,
    accountState: accountReducer,
    opportunityState: opportunityReducer
});
