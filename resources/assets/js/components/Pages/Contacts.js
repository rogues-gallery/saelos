import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import Progress from '../UI/Progress';
import Filter from '../Helpers/Filter';
import ContactPanel from '../Panels/ContactPanel';
import Gravatar from 'react-gravatar';

import { actionCreators } from '../../actions';
import * as types from "../../actions/types";

class Contacts extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchContacts(page.selected + 1));
    }

    _toggleNewPanel() {
        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');

        // Set the form state for a new contact
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: {}
        });
    }

    render() {
        let results = this.props.contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} dispatch={this.props.dispatch} user={this.props.user} />
        });

        let initialPage = 0;
        let pageCount = 10;

        if (this.props.pagination.hasOwnProperty('current_page')) {
            initialPage = this.props.pagination.current_page - 1;
        }

        if (this.props.pagination.hasOwnProperty('last_page')) {
            pageCount = this.props.pagination.last_page;
        }

        let filterFields = {
            first_name: null,
            last_name: null,
            email: null
        }

        return (
            this.props.isFetching && this.props.contacts.length === 0 ? <Backend><Loading type="contacts" /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="content-top flex-row-even">
                        <Filter onInputChange={actionCreators.fetchContacts} filterFields={filterFields} type="contacts" />
                        <div className="content-top-buttons">
                            <span className="create-button button button-primary" onClick={this._toggleNewPanel}>
                                <i className="md-icon">add</i> <span>Create Contact</span>
                            </span>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Stage</th>
                                    {this.props.user.team_leader ?
                                        <th>Assignee</th>
                                    : null}
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>{results}</tbody>
                        </table>
                    </div>

                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} pageCount={pageCount} containerClassName="pagination" />
                </div>
            </Backend>
        );
    }
}

Contacts.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    contacts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

export class Contact extends Component {
    constructor(props) {
        super(props);

        this._assignContact = this._assignContact.bind(this);
        this._removeContact = this._removeContact.bind(this);

        this.state = {
            contact: props.contact
        }
    }

    _toggleBodyClass(data) {
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: data
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _assignContact(e) {
        this.state.contact.user_id = e.target.value;

        actionCreators.postContact(this.state.contact, this.props.dispatch);
    }

    _removeContact(e) {
        actionCreators.removeContact(this.state.contact.id);
    }

    render() {
        let rowClass = 'contact-row-' + this.state.contact.id;

        let teamMembers = _.map(this.props.user.team.users, (member, index) => {
            return <option key={index} value={member.id}>{member.name}</option>
        });

        return (
            <tr className={rowClass}>
                <td className="min-width">
                    <div className="avatar" onClick={this._toggleBodyClass.bind(this, this.state.contact)}>
                        <Gravatar email={this.state.contact.email} size={44} />
                    </div>

                    <div className="title-wrapper">
                        <div className="title">
                            <a onClick={this._toggleBodyClass.bind(this, this.state.contact)}>
                                {this.state.contact.first_name} {this.state.contact.last_name}
                            </a>
                        </div>
                        {this.state.contact.company ?
                        <div className="subtitle">{this.state.contact.company.name}</div>
                            : null}
                    </div>
                </td>

                <td>
                    {this.state.contact.status ? this.state.contact.status.name : 'Unknown'}
                </td>

                <td>
                    {this.state.contact.stage ?
                        <Progress size={this.state.contact.stage.percent} description={this.state.contact.stage.name} /> : 'Unknown'}
                </td>

                {this.props.user.team_leader ?
                    <td>
                        <select onChange={this._assignContact} defaultValue={this.state.contact.user_id}>
                            <option>Select Assignee</option>
                            {teamMembers}
                        </select>
                    </td>
                    : null}

                <td className="actions min-width">
                    <div className="button-dropdown">
                        <i className="md-icon">more_horiz</i>

                        <ul>
                            <li><a onClick={this._removeContact}>Remove</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default connect((store) => {
    return {
        contacts: store.contactState.data,
        pagination: store.contactState.pagination,
        isFetching: store.contactState.isFetching,
        user: store.authState.user
    };
})(Contacts)
