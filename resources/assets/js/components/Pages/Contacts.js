import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import Loading from '../Helpers/Loading';
import Progress from '../UI/Progress';
import Filter from '../Helpers/Filter';
import ContactPanel from '../Panels/ContactPanel';
import HistoryPanel from '../Panels/HistoryPanel';
import EditPanel from '../Panels/EditPanel';
import ContactContactPanel from '../Panels/ContactContactPanel';

import { actionCreators } from '../../actions';
import * as types from "../../actions/types";

class Contacts extends Component {
    constructor(props) {
        super(props);

        this._navToPage = this._navToPage.bind(this);
        this._getNewContact = this._getNewContact.bind(this);
        this._toggleNewPanel = this._toggleNewPanel.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actionCreators.fetchContacts());
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchContacts(page.selected + 1));
    }

    _toggleNewPanel() {
        document.querySelector('.contact-row-new').classList.toggle('contact-panel-open');

        // Set the form state for a new contact
        this.props.dispatch({type: types.FETCHING_SINGLE_CONTACT_SUCCESS, data: this._getNewContact()});
    }

    _getNewContact() {
        let customFieldDefinitions = {};

        this.props.contacts.length !== 0 ? Object.keys(this.props.contacts[0].custom_fields).map((key, index) => {
            let thisField = this.props.contacts[0].custom_fields[key];

            thisField.value = null;

            customFieldDefinitions[thisField.alias] = thisField;
        }) : {};

        return {
            id: 'new',
            custom_fields: customFieldDefinitions,
            company: {}
        }
    }

    render() {
        let results = this.props.contacts.map((contact) => {
            return <Contact key={contact.id} contact={contact} dispatch={this.props.dispatch} />
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
                    <Filter onInputChange={actionCreators.fetchContacts} filterFields={filterFields} type="contacts" />
                    <div className="button button-primary" onClick={this._toggleNewPanel}>
                        <i className="md-icon">person_add</i> <span>Create Contact</span>
                    </div>
                    <div className="contact-row-new">
                        <ContactPanel contact={this._getNewContact()} />
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Stage</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>{results}</tbody>
                        </table>
                    </div>

                    <ReactPaginate onPageChange={this._navToPage} initialPage={initialPage} disableInitialCallback={true} pageCount={pageCount} containerClassName="pagination" />
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
}

export class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contact: props.contact
        }
    }

    _toggleBodyClass() {
        let rowClass = 'tr.contact-row-' + this.state.contact.id;

        document.querySelector(rowClass).classList.toggle('contact-panel-open');

        // Set the form state
        this.props.dispatch({type: types.FETCHING_SINGLE_CONTACT_SUCCESS, data: this.state.contact});
    }

    render() {
        let rowClass = 'contact-row-' + this.state.contact.id;

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

        let avatarUrl = this.state.contact.avatarUrl || avatars[Math.floor(Math.random() * avatars.length)];

        return (
            <tr className={rowClass}>
                <td className="min-width">
                    <div className="avatar" style={{backgroundImage: 'url('+avatarUrl+')'}}/>

                    <div className="title-wrapper">
                        <div className="title">
                            <a onClick={this._toggleBodyClass.bind(this)}>
                                {this.state.contact.first_name} {this.state.contact.last_name}
                            </a>
                        </div>
                        {this.state.contact.company ?
                        <div className="subtitle">{this.state.contact.company.name}</div>
                            : ''}
                    </div>

                    <ContactPanel contact={this.state.contact} dispatch={this.props.dispatch} />
                    <HistoryPanel contact={this.props.contact} dispatch={this.props.dispatch}/>
                    <EditPanel contact={this.props.contact} dispatch={this.props.dispatch}/>
                    <ContactContactPanel contact={this.props.contact} dispatch={this.props.dispatch}/>
                </td>

                <td>
                    {this.state.contact.status ? this.state.contact.status.name : 'Unknown'}
                </td>

                <td>
                    {this.state.contact.stage ?
                        <Progress size={this.state.contact.stage.percent} description={this.state.contact.stage.name} /> : 'Unknown'}
                </td>

                <td className="actions min-width">
                    <div className="button-dropdown">
                        <i className="md-icon">more_horiz</i>

                        <ul>
                            <li><a>Update</a></li>
                            <li><a>Remove</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        );
    }
}

Contact.propTypes = {
    contact: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}

export default connect((store) => {
    return {
        contacts: store.contactState.data,
        pagination: store.contactState.pagination,
        isFetching: store.contactState.isFetching
    };
})(Contacts)
