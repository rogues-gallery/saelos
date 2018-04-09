import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import _ from 'lodash'
import * as MDIcons from 'react-icons/lib/md'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { svgToImage } from '../../../../../utils/helpers/graphics'
import { getStages } from '../../../../stages/store/selectors'
import { getUsers } from '../../../../users/store/selectors'
import { fetchActivityGraph } from '../../../service'

require('chartist-plugin-legend')

class Record extends React.Component {
  state = {
    pipelineData: [],
    activityData: []
  }

  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchActivityGraph())
      .then(res => {
        this.setState({
          activityData: res
        })
      })
  }

  _generateImage = (event) => {
    const svg = document.getElementsByClassName('analytics-graph')[0].children[0]

    svgToImage(svg)
  }

  render() {
    const { users, stages } = this.props
    const { pipelineData, activityData } = this.state
    const orderedUsers = _.orderBy(users, 'name')
    const groupedActivityData = _.groupBy(activityData, 'user_id')
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
      stackBars: true,
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
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          Analytics
        </h4>
        <div className="h-scroll">
          <h5 className="py-4">
          <span className="float-right"><a href="javascript:void(0);" onClick={this._generateImage} className="btn btn-link btn-sm text-primary">Take Snapshot</a></span>
            Pipeline
          </h5>
          <div className="card mb-1">
            <div className="card-body">
              <div className="float-right">
                <div className="dropdown show">
                  <a className="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Users
                  </a>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {orderedUsers.map(u => <span key={u.id} className="dropdown-item" onClick={() => this._updatePipelineGraph(u.id)}>{u.name}</span>)}
                  </div>
                </div>
              </div>
              <div className="analyticsGraph">
                <div className="h1 text-center">74%</div>
                <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-success h5"><MDIcons.MdArrowDropUp /></span><span className="text-dark">23% improvement</span> since last week</div>
                <ChartistGraph data={data} options={options} type="Bar" className="analytics-graph" />
              </div>
            </div>
          </div>
          <div className="pt-3">
            <h5 className="py-4">
            <span className="float-right"><a href="javascript:void(0);" onClick={this._generateImage} className="btn btn-link btn-sm text-primary">Take Snapshot</a></span>
              Activity
            </h5>
            <div className="card mb-1">
              <div className="card-body">
                <div className="analyticsGraph">
                  <div className="h1 text-center">74%</div>
                  <div className="text-center mini-text text-muted text-uppercase pb-2"><span className="text-success h5"><MDIcons.MdArrowDropUp /></span><span className="text-dark">23% improvement</span> since last week</div>
                  <ChartistGraph data={data} options={options} type="Line" className="analytics-graph" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  stages: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default connect(state => ({
  stages: getStages(state),
  users: getUsers(state)
}))(Record)
