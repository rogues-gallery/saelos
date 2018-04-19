import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ActionView from "./ActionView";
import {
  getModel,
  getActionView,
  isOpen,
  isMinimized
} from "../store/selectors";
import { closeTaskContainer, minimizeTaskContainer } from "../store/actions";
import ErrorBoundary from "../../../utils/ErrorBoundry";

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minimized: props.minimized
    };
  }

  _toggleMinimize = e => {
    e.stopPropagation();

    this.setState({
      minimized: !this.state.minimized
    });

    this.props.dispatch(minimizeTaskContainer());
  };

  render() {
    const { open, actionView, model, dispatch } = this.props;
    const { minimized } = this.state;

    return (
      <div className={`task-container card ${open ? "" : "d-none"}`}>
        <ErrorBoundary>
          <div className="card-header bg-dark-grey py-3">
            <h5
              className="m-0 text-light"
              onClick={e => (minimized ? this._toggleMinimize(e) : null)}
            >
              {actionView === "task" ||
              actionView === "create" ||
              typeof model === "undefined"
                ? "Create Task"
                : `${actionView} ${model.name}`}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => dispatch(closeTaskContainer())}
              >
                <span aria-hidden="true" className="text-light">
                  ×
                </span>
              </button>
              <button
                type="button"
                className="close"
                aria-label="Minimize"
                onClick={this._toggleMinimize}
              >
                <span aria-hidden="true" className="text-light">
                  &nbsp;_&nbsp;
                </span>
              </button>
            </h5>
          </div>
          {/* card-body and card-footer are in the action views */}
          <div className={minimized ? "d-none" : ""}>
            <ActionView
              view={actionView}
              model={model}
              toggle={() => dispatch(closeTaskContainer())}
            />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

TaskContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(state => ({
  model: getModel(state),
  open: isOpen(state),
  minimized: isMinimized(state),
  actionView: getActionView(state)
}))(TaskContainer);
