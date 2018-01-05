import { NotificationManager } from 'react-notifications';

let Echo = window.Echo;
let authState = window.reduxStore.getState().authState;



Echo.private(`App.User.${authState.user.id}`)
    .notification((notification) => {
        console.log(notification);
    })
;