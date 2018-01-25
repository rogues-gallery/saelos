import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;

Echo.channel('contacts')
    .listen('ContactUpdated', (e) => {
    })
    .listen('ContactEmailed', (e) => {
    })
;