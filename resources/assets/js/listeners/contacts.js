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
    .listen('NoteAdded', (e) => {
        let message = 'Note added to ' + e.first_name + ' ' + e.last_name + '!';
        let contactState = window.reduxStore.getState().contactState.data;
        let contactIndex = _.findIndex(contactState, {id: e.entity_id});
        let contact = contactState[contactIndex];

        contact.notes.push(e);

        NotificationManager.success(message, null, 2000);
    })
;