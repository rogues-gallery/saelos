import React from "react";
import PropTypes from "prop-types";
import { fetchStages, fetchStage } from "../../../service";
import moment from "moment";
import ReactDOM from "react-dom";

class List extends React.Component {
  constructor(props) {
    super(props);

    this._onScroll = this._onScroll.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
  }

  componentWillMount() {
    const { stages, dispatch, searchString } = this.props;

    if (stages.length === 0) {
      dispatch(fetchStages({ page: 1, searchString }));
    }
  }

  _onKeyPress(event) {
    const { target, charCode } = event;

    if (charCode !== 13) {
      return;
    }

    event.preventDefault();

    this._submit(target);
  }

  _submit(input) {
    const { value } = input;
    const { dispatch } = this.props;

    if (value.length >= 3) {
      dispatch(fetchStages({ page: 1, searchString: value }));
    } else if (value.length === 0) {
      dispatch(fetchStages({ page: 1, searchString: "" }));
    }
  }

  _onScroll(event) {
    const { target } = event;
    const { dispatch, pagination, searchString } = this.props;
    const currentPosition = target.scrollTop + target.offsetHeight;

    if (currentPosition + 300 >= target.scrollHeight) {
      dispatch(
        fetchStages({ page: pagination.current_page + 1, searchString })
      );
    }
  }

  render() {
    const { stages, dispatch, searchString, firstStageId } = this.props;
    const activeIndex =
      parseInt(this.context.router.route.match.params.id) || firstStageId;

    return (
      <div className="col list-panel border-right">
        <div className="px-4 pt-4 bg-white border-bottom">
          <form>
            <input
              type="search"
              className="form-control ds-input"
              id="search-input"
              placeholder="Search..."
              role="combobox"
              aria-autocomplete="list"
              aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0"
              dir="auto"
              style={{ position: "relative", verticalAlign: "top" }}
              onKeyPress={this._onKeyPress}
              defaultValue={searchString}
            />
          </form>
          <div className="micro-text row text-center pt-3 pb-2">
            <div className="text-dark col">
              <b>All</b>
            </div>{" "}
            <div className="text-muted col">
              <b>Active</b>
            </div>{" "}
            <div className="text-muted col">
              <b>Inactive</b>
            </div>
          </div>
        </div>
        <div className="list-group h-scroll" onScroll={this._onScroll}>
          {stages.map(stage => (
            <Stage
              key={stage.id}
              stage={stage}
              dispatch={dispatch}
              router={this.context.router}
              activeID={activeIndex}
            />
          ))}
        </div>
      </div>
    );
  }
}

List.propTypes = {
  stages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  isPosting: PropTypes.bool,
  pagination: PropTypes.object.isRequired,
  searchString: PropTypes.string
};

List.contextTypes = {
  router: PropTypes.object
};

const Stage = ({ stage, dispatch, router, activeID }) => {
  const openStageRecord = id => {
    dispatch(fetchStage(stage.id));
    router.history.push(`/config/stages/${id}`);
  };

  return (
    <div
      onClick={() => openStageRecord(stage.id)}
      className={`list-group-item list-group-item-action align-items-start ${
        stage.id === parseInt(activeID) ? " active" : ""
      }`}
    >
      <h6>{stage.name}</h6>
    </div>
  );
};

Stage.propTypes = {
  stage: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
  activeID: PropTypes.number
};

export default List;
