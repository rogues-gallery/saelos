import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ActionView from './ActionView'
import { getModel, getActionView, isOpen } from '../store/selectors'
import { closeTaskContainer } from '../store/actions'
import ErrorBoundary from '../../../utils/ErrorBoundry'

const TaskContainer = ({open, actionView, model, dispatch}) => (
  <div className={`task-container card ${open ? '' : 'd-none'}`}>
    <ErrorBoundary>
      <div className="card-header bg-dark-grey py-3">
        <h5 className="m-0 text-light">
          {actionView === 'task' || actionView === 'create' || typeof model === 'undefined' ? 'Create Task' : `${actionView} ${model.name}`}
          <button type="button" className="close" aria-label="Close" onClick={() => dispatch(closeTaskContainer())}>
            <span aria-hidden="true" className="text-light">×</span>
          </button>
        </h5>
      </div>
      {/* card-body and card-footer are in the action views */}
      <ActionView view={actionView} model={model} toggle={() => dispatch(closeTaskContainer())} />
    </ErrorBoundary>
  </div>
)

TaskContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(state => ({
  model: getModel(state),
  open: isOpen(state),
  actionView: getActionView(state),
}))(TaskContainer)
