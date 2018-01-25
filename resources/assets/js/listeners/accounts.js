import { NotificationManager } from 'react-notifications';
import * as types from '../actions/types';

let Echo = window.Echo;

Echo.channel('companies')
    .listen('CompanyUpdated', (e) => {
    })
;