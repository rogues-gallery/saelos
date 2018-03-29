import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAnalytics, isStateDirty } from '../../../store/selectors';
import _ from 'lodash';
import * as MDIcons from 'react-icons/lib/md'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { svgToImage } from '../../../../../utils/helpers/graphics'

class Record extends React.Component {
  constructor(props) {
    super(props)

  }

  _generateImage(event) {
    const svg = document.getElementsByClassName('analytics-graph')[0].children[0]

    svgToImage(svg)
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.dispatch(fetchAnalytics(this.props.match.params.id))
    }
  }

  render() {
    const { analytics } = this.props

    const data = {labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'], series: [[12, 10, 9, 8, 6, 5, 3], [10,8,7,5,3,2, 1]] }
    const options = {
          low: 15,
          stackBars: true,
          fullWidth: true,
          showArea: true,
          // showLabel: true,
          axisX: {
            showGrid: false,
            showLabel: true,
            // offset: 0
          },
          axisY: {
            showGrid: true,
            showLabel: false,
            offset: 0
          }
        }

    return (
      <main key={0} className="col main-panel px-3">
        <div className="toolbar border-bottom py-2 heading">
          <button className="btn btn-primary mr-3 btn-sm list-inline-item"><span className="h5"><MDIcons.MdAllInclusive /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item" onClick={this._initReportDownload}><span className="h3"><MDIcons.MdInput /></span></button>
          <button className="btn btn-link mr-2 btn-sm list-inline-item"><span className="h2"><MDIcons.MdInsertChart /></span></button>
        </div>

        <h4 className="border-bottom py-3">
          Analytics
        </h4>
        <div className="h-scroll">
          <span className="float-right mt-1"><a href="javascript:void(0);" onClick={this._generateImage} className="btn btn-link btn-sm text-primary">Take Snapshot</a></span>
          <h5 className="border-bottom py-2">
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
                    <a className="dropdown-item" href="#">User A</a>
                    <a className="dropdown-item" href="#">User B</a>
                    <a className="dropdown-item" href="#">User C</a>
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
            <span className="float-right mt-1"><a href="javascript:void(0);" className="btn btn-link btn-sm text-primary">Take Snapshot</a></span>
            <h5 className="border-bottom py-2">
              Activity
            </h5>
            <div className="card mb-1">
              <div className="card-body">
                <div className="float-right">
                  <div className="dropdown show">
                    <a className="btn btn-outline-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Last Week
                    </a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a className="dropdown-item" href="#">Last Month</a>
                      <a className="dropdown-item" href="#">Last Quarter</a>
                      <a className="dropdown-item" href="#">Last Year</a>
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
          </div>
        </div>
      </main>
    )
  }
}

Record.propTypes = {
  analytics: PropTypes.object.isRequired
}

export default withRouter(connect((state, ownProps) => ({
  analytics: getAnalytics(state, ownProps.match.params.id)
}))(Record))