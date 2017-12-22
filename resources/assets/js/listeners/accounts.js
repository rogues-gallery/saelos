import { NotificationManager } from 'react-notifications';
import * as types from '../actions/types';

let Echo = window.Echo;

Echo.channel('companies')
    .listen('CompanyUpdated', (e) => {
        let message = e.name + ' has been updated!';

        NotificationManager.success(message, null, 2000);

        window.reduxStore.dispatch({type: types.RECEIVED_ACCOUNT_UPDATE, data: e});
    })
;