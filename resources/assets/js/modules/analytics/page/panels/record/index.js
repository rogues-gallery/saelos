import React from 'react'
import ActivityGraph from './components/ActivityGraph'
import PipelineGraph from './components/PipelineGraph'

require('chartist-plugin-legend')

class Record extends React.Component {
  render() {
    return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          Analytics
        </h4>
        <div className="h-scroll">
          <PipelineGraph />
          <ActivityGraph />
        </div>
      </main>
    )
  }
}

export default Record
