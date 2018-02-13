import React from 'react';
import {togglePanelById, togglePreventContentScroll} from "../../../utils/helpers";
import PropTypes from "prop-types";
import * as types from "../../../actions/types";
import Progress from '../../UI/Progress';
import Gravatar from 'react-gravatar';
import Select from 'react-select';
import { actionCreators } from "../../../actions";

export const ContactItem = ({dispatch, user, contact}) => {
    const toggleBodyClass = () => {
        dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: contact
        });

        togglePanelById('contact-panel-wrapper', 'contact-panel-open');
        togglePreventContentScroll();
    };

    const assignContact = (event) => {
        contact.user_id = event.target.value;
        actionCreators.postContact(contact, dispatch);
    };

    const removeContact = () => {
        actionCreators.removeContact(contact.id);
    };

    const getTeamMembers = () => {
        let teamMembers = _.map(user.team.users, (member, index) => {
            return {
                value: member.id,
                label: member.name
            }
        });

        teamMembers.unshift({value:null, label: "Please select..."});
        return teamMembers;
    };

    return (
        <tr className={'contact-row-' + contact.id}>
            <td className="min-width">
                <div className="avatar" onClick={toggleBodyClass}>
                    <Gravatar email={contact.email} size={44} />
                </div>

                <div className="title-wrapper">
                    <div className="title">
                        <a onClick={toggleBodyClass}>
                            {contact.first_name} {contact.last_name}
                        </a>
                    </div>
                    {contact.company ?
                        <div className="subtitle">{contact.company.name}</div>
                        : null}
                </div>
            </td>

            <td>
                {contact.custom_fields.status ? contact.status.name : 'Unknown'}
            </td>

            <td>
                {contact.stage ?
                    <Progress size={contact.stage.percent} description={contact.stage.name} /> : 'Unknown'}
            </td>

            <td>
                <Select
                    value={contact.user_id}
                    onChange={(input) => {
                        let selected = input ? input.value : null;

                        let event = {
                            target: {
                                value: selected
                            }
                        };

                        return assignContact(event);
                    }}
                    options={getTeamMembers()}
                />
            </td>

            <td className="actions min-width">
                <div className="button-dropdown">
                    <i className="md-icon">more_horiz</i>

                    <ul>
                        <li><a onClick={removeContact}>Remove</a></li>
                    </ul>
                </div>
            </td>
        </tr>
    )
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};