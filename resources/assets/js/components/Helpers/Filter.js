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
            this.props.dispatch(this.props.onInputChange(1, {
                first_name: event.target.value,
                last_name: event.target.value,
                email: event.target.value
            }));
        }

        if (event.target.value.length === 0) {
            this.props.dispatch(this.props.onInputChange());
        }
    }

    render() {
        return (
            <div className="filter form-inline">
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" defaultValue={this.props.searchState.first_name} placeholder="Search" onChange={this._handleSubmit} />
                    </div>
                </form>
            </div>
        );
    }
}

Filter.propTypes = {
    dispatch: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    searchState: PropTypes.object.isRequired
}

export default connect((store) => {
    return {
        searchState: store.contactState.search
    }
})(Filter);