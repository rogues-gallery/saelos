import React from 'react';
import PropTypes from 'prop-types';
import { fetchTeams, fetchTeam } from "../../service";

class Page extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchTeams())
  }

  render() {
    return (
      <div className="container">
        {this.props.teams.map(team => <Team key={team.id} team={team} dispatch={this.props.dispatch} />)}
      </div>
    )
  }
}

Page.propTypes = {
  teams: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const Team = ({ team, dispatch }) => {
  return (
    <div className="team" onClick={() => dispatch(fetchTeam(team.id))}>
      {team.title}
    </div>
  );
}

Team.propTypes = {
  team: PropTypes.object.isRequired
};

export default Page;