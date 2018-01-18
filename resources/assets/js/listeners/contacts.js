import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;

Echo.channel('contacts')
    .listen('ContactUpdated', (e) => {
        let message = e.first_name + ' ' + e.last_name + ' has been updated!';

        NotificationManager.success(message, null, 2000);
    })
    .listen('ContactEmailed', (e) => {
        let message = 'Email sent to ' + e.first_name + ' ' + e.last_name + '!';

        NotificationManager.success(message, null, 2000);
    })
;