import { NotificationManager } from 'react-notifications';
import fetch from '../utils/fetch';

let Echo = window.Echo;

fetch('/authenticated', {forAuth: true})
    .then((response) => {
        Echo.private(`App.User.${response.data.status.id}`)
            .notification((notification) => {
                if (notification.message) {
                    NotificationManager.success(notification.message, null, 2000);
                }
            })
        ;
    })
;