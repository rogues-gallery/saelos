import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;

Echo.channel('companies')
    .listen('CompanyUpdated', (e) => {
        let message = e.name + ' has been updated!';

        NotificationManager.success(message, null, 2000);
    })
;