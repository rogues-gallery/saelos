import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from '../../actions';

class Filter extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);
    }

    _handleSubmit(event) {
        if (event.target.value.length > 3) {
            let filterFields = this.props.filterFields;

            Object.keys(filterFields).map((key) => {
                filterFields[key] = event.target.value;
            });

            this.props.dispatch(this.props.onInputChange(1, filterFields));
        }

        if (event.target.value.length === 0) {
            this.props.dispatch(this.props.onInputChange());
        }
    }

    _onKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();

            this._handleSubmit(event);
        }
    }

    render() {
        let searchState = null;

        switch (this.props.type) {
            case 'contacts':
                searchState = this.props.contactSearch;
                break;
            case 'accounts':
                searchState = this.props.accountSearch;
                break;
            case 'opportunities':
                searchState = this.props.opportunitySearch;
                break;
        }

        let searchValue = searchState ? searchState[Object.keys(this.props.filterFields)[0]] : '';

        return (
            <div className="filter">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" defaultValue={searchValue} onKeyDown={this._onKeyPress} placeholder="Search" onChange={this._handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

Filter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    accountSearch: PropTypes.object.isRequired,
    contactSearch: PropTypes.object.isRequired,
    opportunitySearch: PropTypes.object.isRequired,
    filterFields: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
}

export default connect((store) => {
    return {
        accountSearch: store.accountState.search,
        contactSearch: store.contactState.search,
        opportunitySearch: store.opportunityState.search
    }
})(Filter);