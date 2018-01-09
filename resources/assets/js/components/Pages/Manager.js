import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Backend from '../Layouts/Backend';
import InfoboxRep from "../UI/Infobox/InfoboxRep";
import {actionCreators} from "../../actions";
import Loading from "../Helpers/Loading";

class Manager extends Component {
    componentWillMount() {
        this.props.dispatch(actionCreators.fetchTeam(this.props.user.team.id));
    }

    render() {
        let results = this.props.team.users ? this.props.team.users.map((team_member) => {
            return <InfoboxRep key={team_member.id} rep={team_member} size={44} />
        }) : null;

        return (
            this.props.isFetching ? <Backend><Loading/></Backend> :
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
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
};

export default connect((store) => {
    return {
        user: store.authState.user,
        team: store.teamState.data,
        isFetching: store.teamState.isFetching
    };
})(Manager)
