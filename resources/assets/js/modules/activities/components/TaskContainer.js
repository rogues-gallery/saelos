import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ActionView from './ActionView'
import { getModel, getActionView, isOpen } from '../store/selectors'
import { closeTaskContainer } from '../store/actions'

const TaskContainer = ({open, actionView, model, dispatch}) => {
  const headerText = actionView === 'task' ? 'Create Task' : `${actionView} ${model.name}`

  return (
    <div className={`task-container card ${open ? '' : 'd-none'}`}>
      <div className="card-header bg-dark-grey">
        <h3>
          {headerText}
          <a
            href="javascript:void(0)" onClick={() => dispatch(closeTaskContainer())}
            className="float-right text-muted btn btn-xs btn-outline-secondary px-2">
            X
          </a>
        </h3>
      </div>
      {/* card-body div class is in the action views */}
      <div style={{minHeight: "400px"}}>
        <ActionView view={actionView} model={model} toggle={() => dispatch(closeTaskContainer())} />
      </div>
    </div>
  )
}

TaskContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  model: getModel(state),
  open: isOpen(state),
  actionView: getActionView(state),
}))(TaskContainer)