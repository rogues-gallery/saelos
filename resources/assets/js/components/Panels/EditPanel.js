import React, { Component } from 'react';
import { togglePanel } from '../../utils/helpers';
import { Panel } from '../UI/Panel';

const EditPanel = ({contact}) => {
    const togglePanelClass = () => {
        togglePanel(('tr.contact-row-' + contact.id), 'contact-edit-panel-open');
    };

    return (
        <div className="content-side-wrapper">
            <div className="contact-edit-overlay side-overlay" onClick={togglePanelClass} />
            <div className="contact-edit-side side-panel">
                <Panel>
                    <div className="panel-user">
                        <div className="panel-user-content">
                            {contact.first_name ? <div className="panel-user-name">{contact.first_name} {contact.last_name}</div> : ''}

                            {contact.company ? <div className="panel-user-subtitle">{contact.company.name}</div> : ''}

                            <div className="panel-user-action" onClick={togglePanelClass}>
                                <i className="md-icon">close</i>
                            </div>
                        </div>
                    </div>

                    Edit the contact

                </Panel>
            </div>
        </div>
    )
};

EditPanel.propTypes = {
    contact: PropTypes.object
};

export default EditPanel;