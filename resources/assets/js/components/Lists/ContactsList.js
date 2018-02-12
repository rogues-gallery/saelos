import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { actionCreators } from "../../actions";
import Loading from '../Helpers/Loading';
import { getInitialPage, getPageCount } from "../../utils/helpers";
import { ContactItem } from './Items/ContactItem';

const ContactsList = ({dispatch, search, contacts, user, isFetching, pagination}) => {
    const navToPage = (page) => {
        dispatch(actionCreators.fetchContacts(page.selected + 1, search));
    };

    const getResults = () => {
        return contacts.map((contact) => {
            return <ContactItem key={contact.id} contact={contact} dispatch={dispatch} user={user} />
        });
    };

    return (
        isFetching && contacts.length === 0 ? <Loading type="contacts" /> :
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
                <tbody>{getResults()}</tbody>
            </table>

            <ReactPaginate onPageChange={navToPage} initialPage={getInitialPage(pagination)} pageCount={getPageCount(pagination)} containerClassName="pagination" />
        </div>
    )
};

ContactsList.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    contacts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        contacts: store.contactState.data,
        pagination: store.contactState.pagination,
        isFetching: store.contactState.isFetching,
        user: store.authState.user,
        search: store.contactState.search
    };
})(ContactsList);