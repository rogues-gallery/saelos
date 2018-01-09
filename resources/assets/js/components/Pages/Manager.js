import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Backend from '../Layouts/Backend';
import InfoboxRep from "../UI/Infobox/InfoboxRep";
import {actionCreators} from "../../actions";
import Loading from "../Helpers/Loading";

class Manager extends Component {
    render() {
        if (this.props.authenticated === false) {
            return <Backend><Loading/></Backend>
        }

        let results = this.props.user.team.users ? this.props.user.team.users.map((team_member) => {
            return <InfoboxRep key={team_member.id} rep={team_member} size={44} />
        }) : null;

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
    dispatch: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        user: store.authState.user,
        authenticated: store.authState.authenticated
    };
})(Manager)
