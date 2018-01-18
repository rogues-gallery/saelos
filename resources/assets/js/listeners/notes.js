import * as types from '../actions/types';

let Echo = window.Echo;
let _ = require('lodash');

Echo.channel('notes')
    .listen('NoteAdded', (e) => {
        window.reduxStore.dispatch({
            type: types.APPEND_NOTE_TO_FLYOUT,
            data: e,
            entityId: e.entity_id,
            entityType: e.entity_type
        });

        switch (e.entity_type) {
            case 'App\\Person':
                let state = window.reduxStore.getState().contactState;
                let contacts = state.data;
                let contactIndex = _.findIndex(contacts, {id: e.entity_id});

                if (contactIndex >= 0) {
                    contacts[contactIndex].notes.unshift(e);
                }

                console.log(contacts);

                window.reduxStore.dispatch({
                    type: types.FETCHING_CONTACTS_SUCCESS,
                    data: contacts,
                    pagination: state.pagination
                });
                break;
            case 'App\\Deal':
                break;
            case 'App\\Company':
                break;
        }
    })
;