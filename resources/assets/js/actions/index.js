import * as ContactActions from './contacts';
import * as OpportunityActions from './opportunities';
import * as TaskActions from './tasks';
import * as AccountActions from './accounts';
import * as StageActions from './stages';
import * as AuthActions from '../modules/auth/store/auth';
import * as TeamActions from './teams';
import * as UserActions from './users';
import * as ReportActions from './reports';
import * as WorkflowActions from './workflows';

export const actionCreators = Object.assign({},
    AuthActions,
    ContactActions,
    AccountActions,
    OpportunityActions,
    TaskActions,
    StageActions,
    TeamActions,
    UserActions,
    ReportActions,
    WorkflowActions
);

