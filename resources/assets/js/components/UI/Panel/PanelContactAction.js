import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PanelContactAction extends Component {
    toggleBodyClass() {
        let rowClass = 'contact-row-' + this.props.contact.id;

        document.querySelector('tr.' + rowClass).classList.toggle('action-panel-open');
    }

    render() {
        return(
            <div className="panel-user">
                {this.props.image ? <div className="panel-user-avatar" style={{
                    backgroundImage: 'url(' + this.props.image + ')'
                }}></div> : ''}

                <div className="panel-user-content">
                    {this.props.contact.firstName ? <div className="panel-user-name">{this.props.contact.firstName} {this.props.contact.lastName}</div> : ''}

                    {this.props.contact.company ? <div className="panel-user-subtitle">{this.props.contact.company.name}</div> : ''}

                    <div className="panel-user-action" onClick={this.toggleBodyClass.bind(this)}>
                        <i className="md-icon">close</i>
                    </div>
                </div>
            </div>
        );
    }
}

PanelContactAction.propTypes = {
    contact: PropTypes.object.isRequired
}
