import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import ReactTooltip from 'react-tooltip';
import * as types from "../../../actions/types";
import { connect } from 'react-redux';
import Gravatar from 'react-gravatar';

class InfoboxAccount extends Component {
    _togglePanelClass(data) {
        this.props.dispatch({
            type: types.FETCHING_ACCOUNT_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('account-panel-wrapper').classList.toggle('account-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _toggleContactPanel(data) {
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    render() {
        let itemClass = 'infobox account-item-' + this.props.account.id;

        if (typeof this.props.account.people === 'undefined') {
            this.props.account.people = [];
        }

        if (typeof this.props.account.deals === 'undefined') {
            this.props.account.deals = [];
        }

        let accountContacts = Object.keys(this.props.account.people).length ? this.props.account.people.slice(0, 10).map((contact, index) => {
            let tooltipId = "account-"+this.props.account.id+"-contact-"+contact.id;
            let tooltipContent = contact.first_name + " " + contact.last_name;

            if (contact.position) {
                tooltipContent = tooltipContent + ", " + contact.position;
            }

            return <li key={index} onClick={this._toggleContactPanel.bind(this, contact)} className="avatar">
                <span data-tip data-for={tooltipId}>
                    <Gravatar email={contact.email} size={44} />
                </span>
                <ReactTooltip id={tooltipId}>
                    {tooltipContent}
                </ReactTooltip>
            </li>
        }) : [];

        let totalValue = _.sum(_.map(this.props.account.deals, 'amount'));

        return (
            <div className={itemClass}>
                <div className="infobox-inner">
                    <div className="infobox-header">
                        <div className="infobox-header-content" onClick={this._togglePanelClass.bind(this, this.props.account)}>
                            <h3>{this.props.account.name}</h3>
                            <h4>{this.props.account.description}</h4>
                        </div>
                    </div>

                    <div className="infobox-meta">
                        <div className="flex-row-nospace">
                            <div>
                                <span>Amount</span>
                                <strong><Money>{totalValue}</Money></strong>
                            </div>
                        </div>
                        <div>
                            <span>Next Step</span>
                            <strong>Do something</strong>
                        </div>
                    </div>
                    {accountContacts.length ?
                        <div className="infobox-content">
                            <div className="infobox-content-avatars">
                                <strong>Contacts:</strong>

                                <ul>
                                    {accountContacts}
                                </ul>
                            </div>
                        </div>
                        : ''}
                </div>
            </div>
        );
    }
}

InfoboxAccount.propTypes = {
    account: PropTypes.object.isRequired
};

export default connect()(InfoboxAccount)
