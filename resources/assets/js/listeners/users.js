import { NotificationManager } from 'react-notifications';
import fetch from '../utils/fetch';
import * as types from '../actions/types';

let Echo = window.Echo;

fetch('/authenticated', {forAuth: true})
    .then((response) => {
        window.reduxStore.dispatch({
            type: types.AUTH_USER,
            data: response.data.status
        });

        Echo.private(`App.User.${response.data.status.id}`)
            .notification((notification) => {
                if (notification.manualDismiss) {
                    NotificationManager.info(
                        notification.message,
                        'You were mentioned!',
                        10000,
                        () => {
                            if (notification.model) {
                                switch(notification.modelType) {
                                    case 'App\\Person':
                                        window.reduxStore.dispatch({
                                            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
                                            data: notification.model
                                        });

                                        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
                                        document.getElementById('contact-panel-wrapper').classList.toggle('note-panel-open');
                                        document.querySelector('body').classList.toggle('panel-open');
                                        break;
                                    case 'App\\Company':
                                        window.reduxStore.dispatch({
                                            type: types.FETCHING_ACCOUNT_FOR_FLYOUT_SUCCESS,
                                            data: notification.model
                                        });

                                        document.getElementById('account-panel-wrapper').classList.toggle('account-panel-open');
                                        document.getElementById('account-panel-wrapper').classList.toggle('note-panel-open');
                                        document.querySelector('body').classList.toggle('panel-open');
                                        break;
                                    case 'App\\Deal':
                                        window.reduxStore.dispatch({
                                            type: types.FETCHING_OPPORTUNITY_FOR_FLYOUT_SUCCESS,
                                            data: notification.model
                                        });

                                        document.getElementById('opportunity-panel-wrapper').classList.toggle('opportunity-panel-open');
                                        document.getElementById('opportunity-panel-wrapper').classList.toggle('note-panel-open');
                                        document.querySelector('body').classList.toggle('panel-open');
                                        break;
                                }
                            }
                        },
                        true
                    );
                } else {
                    if (notification.message) {
                        NotificationManager.success(notification.message, null, 2000);
                    }
                }
            })
        ;
    })
;