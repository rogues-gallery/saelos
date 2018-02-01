import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Progress from '../UI/Progress';
import Gravatar from 'react-gravatar';
import {actionCreators} from "../../actions";
import * as types from "../../actions/types";
import Loading from '../Helpers/Loading';
import Select from 'react-select';

class ContactsList extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchContacts(page.selected + 1));
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

        return (
            this.props.isFetching && this.props.contacts.length === 0 ? <Loading type="contacts" /> :
            <div className="table-responsive">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Stage</th>
                        <th>Assignee</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>{results}</tbody>
                </table>

                <ReactPaginate onPageChange={this._navToPage} forcePage={initialPage} pageCount={pageCount} containerClassName="pagination" />
            </div>
        )
    }
}

ContactsList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    contacts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

class Contact extends Component {
    constructor(props) {
        super(props);

        this._assignContact = this._assignContact.bind(this);
        this._removeContact = this._removeContact.bind(this);
        this._toggleBodyClass = this._toggleBodyClass.bind(this);
    }

    _toggleBodyClass() {
        this.props.dispatch({
            type: types.FETCHING_CONTACT_FOR_FLYOUT_SUCCESS,
            data: this.props.contact
        });

        document.getElementById('contact-panel-wrapper').classList.toggle('contact-panel-open');
        document.querySelector('body').classList.toggle('panel-open');
    }

    _assignContact(e) {
        this.props.contact.user_id = e.target.value;

        actionCreators.postContact(this.props.contact, this.props.dispatch);
    }

    _removeContact(e) {
        actionCreators.removeContact(this.props.contact.id);
    }

    render() {
        let rowClass = 'contact-row-' + this.props.contact.id;

        let teamMembers = _.map(this.props.user.team.users, (member, index) => {
            return {
                value: member.id,
                label: member.name
            }
        });

        teamMembers.unshift({value:null, label: "Please select..."});

        return (
            <tr className={rowClass}>
                <td className="min-width">
                    <div className="avatar" onClick={this._toggleBodyClass}>
                        <Gravatar email={this.props.contact.email} size={44} />
                    </div>

                    <div className="title-wrapper">
                        <div className="title">
                            <a onClick={this._toggleBodyClass}>
                                {this.props.contact.first_name} {this.props.contact.last_name}
                            </a>
                        </div>
                        {this.props.contact.company ?
                            <div className="subtitle">{this.props.contact.company.name}</div>
                            : null}
                    </div>
                </td>

                <td>
                    {this.props.contact.custom_fields.status ? this.props.contact.status.name : 'Unknown'}
                </td>

                <td>
                    {this.props.contact.stage ?
                        <Progress size={this.props.contact.stage.percent} description={this.props.contact.stage.name} /> : 'Unknown'}
                </td>

                <td>
                    <Select
                        value={this.props.contact.user_id}
                        onChange={(input) => {
                            let selected = input ? input.value : null;

                            let event = {
                                target: {
                                    value: selected
                                }
                            };

                            return this._assignContact(event);
                        }}
                        options={teamMembers}
                    />
                </td>

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
    user: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        contacts: store.contactState.data,
        pagination: store.contactState.pagination,
        isFetching: store.contactState.isFetching,
        user: store.authState.user
    };
})(ContactsList);