import * as ContactActions from './contacts';
import * as MemberActions from './members';
import * as ProjectActions from './projects';
import * as OpportunityActions from './opportunities';
import * as TaskActions from './tasks';
import * as AccountActions from './accounts';
import * as StageActions from './stages';
import * as AuthActions from './auth';

export const actionCreators = Object.assign({},
    AuthActions,
    ContactActions,
    MemberActions,
    ProjectActions,
    AccountActions,
    OpportunityActions,
    TaskActions,
    StageActions
);

