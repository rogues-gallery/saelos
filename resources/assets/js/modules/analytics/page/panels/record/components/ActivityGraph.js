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

  _updateActivityGraph = (timeframe) => {
    const { dispatch } = this.props

    dispatch(fetchActivityGraph({timeframe}))
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
    let labels = []

    if (fetching) {
      return <div>Loading...</div>
    }

    const groupedActivityData = _.groupBy(graphData, 'user_id')
    const seriesData = Object.keys(groupedActivityData).map(k => {
      const groupData = groupedActivityData[k]

      if (activityView === 'weekly') {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => {
          const truncated = d.substr(0, 3)

          if (!labels.includes(truncated)) {
            labels.push(truncated)
          }

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
      }

      if (activityView === 'monthly') {
        const daysInMonth = new Date(null, null, 0).getDate()
        const days = [...Array(daysInMonth + 1).keys()].slice(1).map(d => {
          if (!labels.includes(d)) {
            labels.push(d)
          }

          const tmp = _.findIndex(groupData, i => i.monthday === d)

          if (tmp > -1) {
            return groupData[tmp].count
          }

          return 0
        })

        return {
          name: _.find(users, u => parseInt(u.id) === parseInt(k)).name,
          data: days
        }
      }
    })

    const data = {
      labels: labels,
      series: seriesData
    }

    const options = {
      low: 0,
      high: 50,
      ticks: [1,5,10,15,20,25,30,35,40,45,50],
      stackBars: false,
      height: '400px',
      fullWidth: true,
      showArea: true,
      axisX: {
        showGrid: true,
        showLabel: true,
      },
      axisY: {
        showGrid: true,
        showLabel: true,
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
                options={[{value: 'weekly', label: 'This week'}, {value: 'monthly', label: 'This month'}]}
                onChange={selection => {
                  this.setState({
                    activityView: selection.value
                  })

                  this._updateActivityGraph(selection.value)
                }}
                />
            </div>
            <div className="analyticsGraph">
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
