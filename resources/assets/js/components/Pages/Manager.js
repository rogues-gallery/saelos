import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Backend from '../Layouts/Backend';

class Manager extends Component {
    render() {
        let results = this.props.user.team.users.map((team_member, index) => {
            return <div key={index}>
                {team_member.name}
            </div>
        });

        return (
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

Manager.propTypes = {
    user: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        user: store.authState.user
    };
})(Manager)
