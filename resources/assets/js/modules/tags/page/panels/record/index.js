import React from "react";
import PropTypes from "prop-types";
import { getTag } from "../../../store/selectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CirclePicker } from "react-color";
import { deleteTag, fetchTag, fetchTags, saveTag } from "../../../service";
import moment from "moment/moment";
import _ from "lodash";
import { handleInputChange } from "../../../../../utils/helpers/fields";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.tag.originalProps,
      pickerOpen: false,
      inEdit: false
    };
  }

  componentWillMount() {
    const { dispatch, match } = this.props;

    if (match.params.id) {
      dispatch(fetchTag(match.params.id));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ formState: nextProps.tag.originalProps });
  }

  _submit = () => {
    this.props.dispatch(saveTag(this.state.formState)).then(this._toggleEdit);
  };

  _toggleEdit = () => {
    return this.setState({ inEdit: !this.state.inEdit });
  };

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {}),
      pickerOpen: false
    });
  };

  _delete = () => {
    const { dispatch, tag } = this.props;

    dispatch(deleteTag(tag.id));
    this.context.router.history.push("/tags");
  };

  _openRecord = (base, id) => {
    this.context.router.history.push(`/${base}/${id}`);
  };

  render() {
    const { tag } = this.props;
    const { formState, pickerOpen, inEdit } = this.state;
    const { contacts, opportunities, companies, activities } = tag;

    //@TODO Simplify this check somehow/somewhere
    formState.color = formState.color === null ? "" : formState.color;

    if (tag.id === null) {
      return (
        <main className="col main-panel px-3 align-self-center full-panel">
          <h2 className="text-muted text-center">
            {this.context.i18n.t("messages.select.tag.to.edit")}
          </h2>
        </main>
      );
    }

    let emojis = tag.name.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    let tagDisplay =
      emojis instanceof Array ? (
        <span>
          <span className="emoji">{emojis[0]}</span>{" "}
          {_.replace(tag.name, emojis[0], "")}
        </span>
      ) : tag.color ? (
        <span>
          <span className="dot mr-2" style={{ backgroundColor: tag.color }} />{" "}
          {tag.name}
        </span>
      ) : (
        <span>
          <span className="dot mr-2" />
          {tag.name}
        </span>
      );

    return (
      <main className="col main-panel full-panel">
        <h4 className="border-bottom pl-3 py-3 mb-0">
          <div className="float-right ">
            <button
              className="btn btn-link list-inline-item"
              onClick={this._delete}
            >
              {this.context.i18n.t("messages.delete")}
            </button>
            <button
              className="btn btn-primary mr-3 list-inline-item"
              onClick={this._toggleEdit}
            >
              {this.context.i18n.t("messages.edit")}
            </button>
          </div>
          {tagDisplay}
        </h4>

        {this.state.inEdit ? (
          <div className="border-bottom">
            {" "}
            {/* Do something to toggle inEdit */}
            <div className="card mx-2 my-2">
              <ul className={`list-group list-group-flush`}>
                <li className="list-group-item">
                  <div className={`form-group mb-2`}>
                    <label htmlFor="tagName" className="">
                      {this.context.i18n.t("messages.name")}
                    </label>
                    <div className="">
                      <input
                        type="text"
                        id="tagName"
                        name="name"
                        onChange={this._handleInputChange}
                        className="form-control"
                        value={formState.name}
                      />
                    </div>
                  </div>
                  <div className={`form-group mb-2`}>
                    <label htmlFor="tagColor" className="">
                      {this.context.i18n.t("messages.color")}
                    </label>
                    <div className="form-group">
                      <CirclePicker
                        color={formState.color}
                        name="tagColor"
                        width="100%"
                        circleSize={20}
                        circleSpacing={10}
                        onChangeComplete={color => {
                          const event = {
                            target: {
                              name: "color",
                              value: color.hex
                            }
                          };

                          this._handleInputChange(event);
                        }}
                        placeholder={tag.color}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary mr-3 list-inline-item"
                    onClick={this._submit}
                  >
                    {this.context.i18n.t("messages.save")}
                  </button>
                  <button
                    className="btn btn-link mr-3 list-inline-item"
                    onClick={this._toggleEdit}
                  >
                    {this.context.i18n.t("messages.cancel")}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row no-gutters">
          <div className="col-md-3 border-right pr-0 col-sm-12">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                {this.context.i18n.t("messages.contact_plural")}
              </div>
            </div>
            <div className="list-group h-scroll">
              {contacts.map(contact => (
                <div
                  key={`contact-list-${contact.id}`}
                  onClick={() => this._openRecord("contacts", contact.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">
                    {moment(contact.updated_at).fromNow()}
                  </span>
                  <h6>
                    {contact.first_name} {contact.last_name}
                  </h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 border-right px-0 col-sm-12">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                {this.context.i18n.t("messages.company_plural")}
              </div>
            </div>
            <div className="list-group h-scroll">
              {companies.map(company => (
                <div
                  key={`company-list-${company.id}`}
                  onClick={() => this._openRecord("companies", company.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">
                    {moment(company.updated_at).fromNow()}
                  </span>
                  <h6>{company.name}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 border-right pl-0 col-sm-12">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                {this.context.i18n.t("messages.opportunity_plural")}
              </div>
            </div>
            <div className="list-group h-scroll">
              {opportunities.map(opportunity => (
                <div
                  key={`opportunity-list-${opportunity.id}`}
                  onClick={() =>
                    this._openRecord("opportunities", opportunity.id)
                  }
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">
                    {moment(opportunity.updated_at).fromNow()}
                  </span>
                  <h6>{opportunity.name}</h6>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3 border-right pl-0 col-sm-12">
            <div className="position-relative py-2 border-bottom">
              <div className="pt-1 mt-1 h5 text-center">
                {this.context.i18n.t("messages.task_plural")}
              </div>
            </div>
            <div className="list-group h-scroll">
              {activities.map(activity => (
                <div
                  key={`activity-list-${activity.id}`}
                  onClick={() => this._openRecord("headquarters", activity.id)}
                  className="list-group-item list-group-item-action align-items-start"
                >
                  <span className="text-muted mini-text float-right">
                    {moment(activity.updated_at).fromNow()}
                  </span>
                  <h6>{activity.name}</h6>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

Record.propTypes = {
  tag: PropTypes.object.isRequired
};

Record.contextTypes = {
  router: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    tag: getTag(state, ownProps.match.params.id)
  }))(Record)
);
