import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Money } from 'react-format';
import AccountPanel from "../../Panels/AccountPanel";

export default class InfoboxAccount extends Component {
    _togglePanelClass() {
        let itemClass = 'div.account-item-' + this.props.account.id;

        document.querySelector(itemClass).classList.toggle('account-panel-open');
    }

    render() {
        let itemClass = 'infobox account-item-' + this.props.account.id;

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
                                <strong><Money>{this.props.account.amount}</Money></strong>
                            </div>
                        </div>
                        <div>
                            <span>Next Step</span>
                            <strong>Do something</strong>
                        </div>
                    </div>

                    <div className="infobox-content">
                        <div className="infobox-content-avatars">
                            <strong>Contacts:</strong>

                            <ul>
                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-1.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-2.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-3.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-4.jpg)'}}></span>
                                </li>

                                <li>
                                    <span style={{backgroundImage: 'url(/img/tmp/user-5.jpg)'}}></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <AccountPanel account={this.props.account} />
            </div>
        );
    }
}

InfoboxAccount.propTypes = {
    account: PropTypes.object.isRequired
};
