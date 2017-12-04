import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backend from '../Layouts/Backend';
import { connect } from 'react-redux';
import { actionCreators } from '../../actions';
import Loading from '../Helpers/Loading';
import InfoboxAccount from "../UI/Infobox/InfoboxAccount";
import diff from 'recursive-diff';

class Accounts extends Component {
    componentWillMount() {
        this.props.dispatch(actionCreators.fetchAccounts());
    }

    shouldComponentUpdate(nextProps) {
        let changed = diff.getDiff(this.props.accounts, nextProps.accounts);

        return JSON.stringify(changed) !== '{}';
    }

    _navToPage(page) {
        this.props.dispatch(actionCreators.fetchAccounts(page.selected + 1));
    }

    render() {
        let results = this.props.accounts.map((account) => {
            return <InfoboxAccount key={account.id} account={account} />
        });

        return (
            this.props.isFetching ? <Backend><Loading /></Backend> :
            <Backend>
                <div className="content-inner">
                    <div className="accounts flex-row-even">
                        {results}
                    </div>
                </div>
            </Backend>
        );
    }
}

Accounts.propTypes = {
    dispatch: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    accounts: PropTypes.array.isRequired,
    pagination: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        accounts: store.accountState.data,
        pagination: store.accountState.pagination,
        isFetching: store.accountState.isFetching
    };
})(Accounts)
