import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as MDIcons from 'react-icons/lib/md'
import {fetchActivity} from "../service";

class ListActivities extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      view: props.view ? props.view : 'activities',
    }
  }

  render() {
    const { activities, dispatch, ...props } = this.props
    return activities.map(activity => <Activity key={activity.id} activity={activity} view={this.state.view} dispatch={dispatch} router={this.context.router} />)
  }
}

const Activity = ({ activity, dispatch, router, view }) => {
  const openActivityRecord = (id, view) => {
    dispatch(fetchActivity(activity.id))
    router.history.push(`/${view}/${id}`)
  }

  return (
    <div onClick={() => openActivityRecord(activity.id, view)} className={`list-group-item list-group-item-action align-items-start ${activity.id === 0 ? 'active' : ''}`}>
      <span className="mini-text text-muted float-right"><b>{moment(activity.due_date).fromNow()}</b></span>
      <h6>{activity.title}</h6>
    </div>
  );
}

ListActivities.contextTypes = {
  router: PropTypes.object
}

export default ListActivities