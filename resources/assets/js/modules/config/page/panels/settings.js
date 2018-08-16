import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import _ from "lodash";
import { languageOptions, currencyOptions } from "../../../../utils/formatters";
import { saveSetting } from "../../service";
import { getEmailFolders } from "../../../users/service";

class Settings extends React.Component {
  state = {
    folderOptions: [],
    formState: window.SAELOS_CONFIG
  };

  componentDidMount() {
    getEmailFolders(true).then(folders => {
      this.setState({
        folderOptions: folders.map(folder => ({
          label: folder,
          value: folder
        }))
      });
    });
  }

  handleInputChange = e => {
    const { target } = e;
    const { name, value } = target;
    const submit = {
      name,
      value
    };

    _.set(window.SAELOS_CONFIG, name, value);

    const state = Object.assign({}, this.state);

    _.set(state, name, value);

    saveSetting(submit);

    this.setState(state);
  };

  handleCurrencyChange = selection => {
    this.handleInputChange({
      target: {
        name: "currency",
        value: selection.value
      }
    });
  };

  handleLanguageChange = selection => {
    this.context.i18n.changeLanguage(selection.value);

    this.handleInputChange({
      target: {
        name: "lang",
        value: selection.value
      }
    });
  };

  handleFolderChange = selection => {
    this.handleInputChange({
      target: {
        name: "imap_folder",
        value: selection.value
      }
    });
  };

  render() {
    const { formState, folderOptions } = this.state;

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
                      value={formState.lang}
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
                      value={formState.currency}
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
                      defaultValue={formState.date_format}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.imap.settings")}
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.host")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_host"
                      name="imap_host"
                      className="form-control"
                      onChange={this.handleInputChange}
                      defaultValue={formState.imap_host}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.port")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_port"
                      name="imap_port"
                      className="form-control"
                      onChange={this.handleInputChange}
                      defaultValue={formState.imap_port}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.encryption")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_encryption"
                      name="imap_encryption"
                      className="form-control"
                      onChange={this.handleInputChange}
                      defaultValue={formState.imap_encryption}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.username")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_username"
                      name="imap_username"
                      className="form-control"
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      defaultValue={formState.imap_username}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.password")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_password"
                      name="imap_password"
                      className="form-control"
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t("messages.imap.settings.folder")}
                  </label>
                  <div className="">
                    <Select
                      multi={false}
                      valueKey="value"
                      labelKey="label"
                      value={formState.imap_folder}
                      onChange={this.handleFolderChange}
                      options={folderOptions}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label className="">
                    {this.context.i18n.t(
                      "messages.imap.settings.excluded_domains"
                    )}
                  </label>
                  <div className="">
                    <textarea
                      className="form-control"
                      name="imap_excluded_domains"
                      onChange={this.handleInputChange}
                      defaultValue={formState.imap_excluded_domains}
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
