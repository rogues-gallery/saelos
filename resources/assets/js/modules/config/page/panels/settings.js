import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import _ from "lodash";
import { languageOptions, currencyOptions } from "../../../../utils/formatters";
import { saveSetting } from "../../service";

class Settings extends React.Component {
  state = {
    lang: window.SAELOS_CONFIG.LANG,
    currency: window.SAELOS_CONFIG.CURRENCY,
    date_format: window.SAELOS_CONFIG.DATE_FORMAT
  };

  handleInputChange = e => {
    const { target } = e;
    const { name, value } = target;
    const state = Object.assign({}, this.state);

    _.set(state, name, value);

    saveSetting(target);

    this.setState(state);
  };

  handleCurrencyChange = selection => {
    window.SAELOS_CONFIG.CURRENCY = selection.value;

    this.handleInputChange({
      target: {
        name: "currency",
        value: selection.value
      }
    });
  };

  handleLanguageChange = selection => {
    window.SAELOS_CONFIG.LANG = selection.value;
    this.context.i18n.changeLanguage(selection.value);

    this.handleInputChange({
      target: {
        name: "lang",
        value: selection.value
      }
    });
  };

  render() {
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
                      value={this.state.language}
                      onChange={this.handleLanguageChange}
                      options={languageOptions}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="currency" className="">
                    {this.context.i18n.t("messages.locale.currency")}
                  </label>
                  <div className="">
                    <Select
                      multi={false}
                      value={this.state.currency}
                      onChange={this.handleCurrencyChange}
                      options={currencyOptions}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="date_format" className="">
                    {this.context.i18n.t("messages.locale.date.format")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="date_format"
                      name="date_format"
                      className="form-control"
                      placeholder="Y-m-d H:i:s"
                      onChange={this.handleInputChange}
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
