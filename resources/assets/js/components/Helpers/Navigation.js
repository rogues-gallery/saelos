import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return(
            <div className="navigation">
                <ul>
                    <li>
                        <NavLink to="/" exact={true} activeClassName="active">
                             <i className="md-icon">dashboard</i> <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/headquarters" activeClassName="active">
                            <i className="md-icon">looks</i> <span>My Vector</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contacts" activeClassName="active">
                            <i className="md-icon">people</i> <span>Contacts</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/accounts" activeClassName="active">
                            <i className="md-icon">domain</i> <span>Accounts</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/opportunities" activeClassName="active">
                            <i className="md-icon">library_books</i> <span>Opportunities</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/reports" activeClassName="active">
                            <i className="md-icon">class</i> <span>Reports</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/content" activeClassName="active">
                            <i className="md-icon">perm_media</i> <span>Content Library</span>
                        </NavLink>
                    </li>
                </ul>

                <strong>Additional Links</strong>

                <ul>
                    <li>
                        <NavLink to="/icons" activeClassName="active">
                            <i className="md-icon">portrait</i> <span>Reps</span>
                        </NavLink>
                    </li>

                </ul>
            </div>
        );
    }
}
