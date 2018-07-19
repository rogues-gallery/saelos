import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";

class Settings extends React.Component {
  render() {
    const languageOptions = [
      {
        label: "English",
        value: "en"
      },
      {
        label: "Spanish",
        value: "es"
      }
    ];

    return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          {this.context.i18n.t("messages.settings")}
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.locale")}
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="currency" className="">
                    {this.context.i18n.t("messages.locale.language")}
                  </label>
                  <div className="">
                    <Select
                      multi={false}
                      value={this.context.i18n.language}
                      onChange={selection => {
                        this.context.i18n.changeLanguage(selection.value);
                      }}
                      options={languageOptions}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="currency" className="">
                    {this.context.i18n.t("messages.locale.currency")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="currency"
                      name="currency"
                      className="form-control"
                      placeholder="$ USD"
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="datetime" className="">
                    {this.context.i18n.t("messages.locale.date.format")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="datetime"
                      name="datetime"
                      className="form-control"
                      placeholder="2018/03/30 3:40PM"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

Settings.propTypes = {};

Settings.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default withRouter(connect()(Settings));
