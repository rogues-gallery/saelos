import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Chartist from 'chartist'
import ChartistGraph from 'react-chartist'
import _ from 'lodash'
import Select from 'react-select'
import * as MDIcons from 'react-icons/lib/md'
import { getStages } from '../../../../../stages/store/selectors'
import { getUsers } from '../../../../../users/store/selectors'
import { fetchPipelineGraph } from '../../../../service'

class PipelineGraph extends React.Component {
  state = {
    graphData: [],
    fetching: true,
    pipelineUser: null
  }

  componentDidMount() {
    this._updatePipelineGraph()
  }

  _updatePipelineGraph = (user_id) => {
    const { dispatch } = this.props

    dispatch(fetchPipelineGraph({user_id}))
      .then(res => {
        this.setState({
          graphData: res.data,
          fetching: false
        })
      })
  }

  _buildPipelineData = (graphData) => {
    const data = [
      {
        name: 'All',
        data: []
      },
      {
        name: 'Team',
        data: []
      },
      {
        name: 'Rep',
        data: []
      }
    ]

    graphData.map(d => {
      data[0].data.push(d.count - d.count_for_team)
      data[1].data.push(d.count_for_team - d.count_for_user)
      data[2].data.push(d.count_for_user)
    })

    return data
  }

  render() {
    const { users, stages } = this.props
    const { graphData, fetching, pipelineUser } = this.state


    if (fetching) {
      return <div>Loading...</div>
    }

    const data = {
      labels: graphData.map(s => s.name),
      series: this._buildPipelineData(graphData)
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
          <span className="float-right">
            <a href="javascript:void(0);" className="btn btn-link btn-sm text-primary">Take Snapshot</a>
          </span>
          Pipeline
        </h5>
        <div className="card mb-1">
          <div className="card-body">
            <div className="float-right" style={{width:"100px", zIndex:99}}>
              <Select
                value={pipelineUser}
                clearable={false}
                options={_.orderBy(users, 'name').map(u => ({value: u.id, label: u.name}))}
                onChange={selection => {
                  this.setState({
                    pipelineUser: selection.value
                  })

                  this._updatePipelineGraph(selection.value)
                }}
              />
            </div>
            <div className="analyticsGraph">
              <div className="h1 text-center">74%</div>
              <div className="text-center mini-text text-muted text-uppercase pb-2">
                <span className="text-success h5"><MDIcons.MdArrowDropUp /></span>
                <span className="text-dark">23% improvement</span> since last week
              </div>
              <ChartistGraph data={data} options={options} type="Bar" className="analytics-graph" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PipelineGraph.propTypes = {
  dispatch: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
}

export default connect(state => ({
  users: getUsers(state),
  stages: getStages(state)
}))(PipelineGraph)
