import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Chartist from 'chartist'
import ChartistGraph from 'react-chartist'
import _ from 'lodash'
import Select from 'react-select'
import * as MDIcons from 'react-icons/lib/md'
import { fetchActivityGraph } from '../../../../service'
import { getUsers } from '../../../../../users/store/selectors'

class ActivityGraph extends React.Component {
  state = {
    graphData: [],
    fetching: true,
    activityView: 'weekly'
  }

  componentDidMount() {
    this._updateActivityGraph()
  }

  _updateActivityGraph = (params) => {
    const { dispatch } = this.props

    dispatch(fetchActivityGraph(params))
      .then(res => {
        this.setState({
          graphData: res,
          fetching: false
        })
      })
  }

  render() {
    const { users } = this.props
    const { graphData, fetching, activityView } = this.state

    if (fetching) {
      return <div>Loading...</div>
    }

    const groupedActivityData = _.groupBy(graphData, 'user_id')
    const seriesData = Object.keys(groupedActivityData).map(k => {
      const groupData = groupedActivityData[k]
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => {
        const tmp = _.findIndex(groupData, i => i.weekday === d)

        if (tmp > -1) {
          return groupData[tmp].count
        }

        return 0
      })

      return {
        name: _.find(users, u => parseInt(u.id) === parseInt(k)).name,
        data: days
      }
    })

    const data = {
      labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      series: seriesData
    }

    const options = {
      low: 0,
      stackBars: false,
      fullWidth: true,
      showArea: true,
      axisX: {
        showGrid: false,
        showLabel: true,
      },
      axisY: {
        showGrid: true,
        showLabel: false,
      },
      plugins: [
        Chartist.plugins.legend()
      ]
    }

    return (
      <div className="pt-3">
        <h5 className="py-4">
          <span className="float-right"><a href="javascript:void(0);" className="btn btn-link btn-sm text-primary">Take Snapshot</a></span>
          Activity
        </h5>
        <div className="card mb-1">
          <div className="card-body">
            <div className="float-right" style={{width:"100px", zIndex:99}}>
              <Select
                value={activityView}
                clearable={false}
                options={[{value: 'weekly', label: 'Weekly'}, {value: 'monthly', label: 'Monthly'}]}
                onChange={selection => {
                  this.setState({
                    activityView: selection.value
                  })
                }}
                />
            </div>
            <div className="analyticsGraph">
              <div className="h1 text-center">74%</div>
              <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-success h5"><MDIcons.MdArrowDropUp /></span><span className="text-dark">23% improvement</span> since last week</div>
              <ChartistGraph data={data} options={options} type="Line" className="analytics-graph" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ActivityGraph.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default connect(state => ({
  users: getUsers(state)
}))(ActivityGraph)
