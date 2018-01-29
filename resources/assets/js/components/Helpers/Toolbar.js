import React, { Component } from 'react';
import Navigation from './Navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Accounts from '../Pages/Accounts';

class Toolbar extends Component {
    constructor(props) {
        super(props);

        this._toggleActionsBodyClass = this._toggleActionsBodyClass.bind(this);
    }

    _toggleActionsBodyClass() {
        document.body.classList.toggle('toolbar-actions-open');
    }

    render() {
        return (
            <div className="toolbar toolbar-slide">
                <div className="toolbar-inner">
                    <div className="logo">
                        <img src="/img/logo_light.svg" width={30} height={30} alt="Saelos" />
                    </div>

                    <ul className="top">
                        <li>
                            <a onClick={this._toggleActionsBodyClass}>
                                <i className="md-icon">add</i>
                            </a>
                        </li>
                    </ul>

                    <Navigation />

                    <ul className="bottom">
                        <li>
                            <a href="/logout">
                                <i className="md-icon">power_settings_new</i>
                            </a>
                        </li>
                    </ul>

                    <div className="toolbar-actions">
                        <div className="toolbar-slide-overlay" />

                        <div className="toolbar-slide-inner">
                            <div className="toolbar-slide-close" onClick={this._toggleActionsBodyClass}>
                                <i className="md-icon">close</i>
                            </div>

                            <div className="toolbar-slide-content">
                                <strong>Create New</strong>

                                <ul>
                                    <li>
                                        <a>
                                            <i className="md-icon">contacts</i> <span>Communication</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="javascript:void(0);" onClick={Accounts._toggleNewPanel}>
                                            <i className="md-icon">domain</i> <span>Account</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">people</i> <span>Contact</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">library_books</i> <span>Opportunity</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">note_add</i> <span>Note</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a>
                                            <i className="md-icon">class</i> <span>Report</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Toolbar.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        user: store.authState.user
    }
})(Toolbar);
