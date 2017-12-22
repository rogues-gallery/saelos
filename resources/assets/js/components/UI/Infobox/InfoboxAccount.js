import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import AccountPanel from "../../Panels/AccountPanel";
import ReactTooltip from 'react-tooltip';

export default class InfoboxAccount extends Component {
    _togglePanelClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-panel-open');
    }

    render() {
        let itemClass = 'infobox account-item-' + this.props.account.id;
        let avatars = [
            '/img/tmp/user-1.jpg',
            '/img/tmp/user-2.jpg',
            '/img/tmp/user-3.jpg',
            '/img/tmp/user-4.jpg',
            '/img/tmp/user-5.jpg',
            '/img/tmp/user-6.jpg',
            '/img/tmp/user-7.jpg',
            '/img/tmp/user-8.jpg',
            '/img/tmp/user-9.jpg',
            '/img/tmp/user-10.jpg',
        ];

        if (typeof this.props.account.people === 'undefined') {
            this.props.account.people = [];
        }

        if (typeof this.props.account.deals === 'undefined') {
            this.props.account.deals = [];
        }

        let accountContacts = Object.keys(this.props.account.people).length ? this.props.account.people.slice(0, 10).map((contact, index) => {
            let avatarUrl = avatars[Math.floor(Math.random() * avatars.length)]
            let tooltipId = "account-"+this.props.account.id+"-contact-"+contact.id;

            return <li key={index}>
                <span data-tip data-for={tooltipId} style={{backgroundImage: 'url('+avatarUrl+')'}} />
                <ReactTooltip id={tooltipId}>
                    {contact.first_name + " " + contact.last_name}
                </ReactTooltip>
            </li>
        }) : [];

        let totalValue = _.sum(_.map(this.props.account.deals, 'amount'));

        return (
            <div className={itemClass}>
                <div className="infobox-inner">
                    <div className="infobox-header">
                        <div className="infobox-header-content" onClick={this._togglePanelClass.bind(this)}>
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
                <AccountPanel account={this.props.account} />
            </div>
        );
    }
}

InfoboxAccount.propTypes = {
    account: PropTypes.object.isRequired
};
