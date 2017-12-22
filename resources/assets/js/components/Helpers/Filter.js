import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionCreators } from '../../actions';

class Filter extends Component {
    constructor(props) {
        super(props);

        this._handleSubmit = this._handleSubmit.bind(this);
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

    render() {
        let searchValue = this.props.searchState[Object.keys(this.props.filterFields)[0]];

        return (
            <div className="filter form-inline">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" defaultValue={searchValue} placeholder="Search" onChange={this._handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

Filter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    searchState: PropTypes.object.isRequired,
    filterFields: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        searchState: store.accountState.search
    }
})(Filter);