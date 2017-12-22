import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;

Echo.channel('deals')
    .listen('DealUpdated', (e) => {
        let message = e.name + ' has been updated!';

        NotificationManager.success(message, null, 2000);
    })
;