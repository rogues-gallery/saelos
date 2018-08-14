import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import Select from "react-select";
import { getActiveUser } from "../../store/selectors";
import { saveUser, getEmailFolders } from "../../service";
import { handleInputChange } from "../../../../utils/helpers/fields";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folderOptions: [],
      formState: props.user.originalProps
    };
  }

  componentDidMount() {
    getEmailFolders().then(folders => {
      this.setState({
        folderOptions: folders.map(folder => ({
          label: folder,
          value: folder
        }))
      });
    });
  }

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
    });
  };

  _submit = () => {
    this.props.dispatch(saveUser(this.state.formState));
  };

  handleFolderChange = selection => {
    this._handleInputChange({
      target: {
        name: "settings.imap_folder",
        value: selection.value
      }
    });
  };

  render() {
    const { user } = this.props;
    const { formState, folderOptions } = this.state;

    return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          <button
            className="float-right btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            {this.context.i18n.t("messages.save")}
          </button>
          {this.context.i18n.t("messages.my.profile")}
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Personal</div>
                <div className="row">
                  <div className="col">
                    <div className={`form-group mb-2`}>
                      <label htmlFor="name" className="">
                        {this.context.i18n.t("messages.name")}
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          onChange={this._handleInputChange}
                          placeholder="Name"
                          defaultValue={formState.name}
                        />
                      </div>
                    </div>
                    <div className={`form-group mb-2`}>
                      <label htmlFor="username" className="">
                        {this.context.i18n.t("messages.username")}
                      </label>
                      <div className="">
                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control"
                          onChange={this._handleInputChange}
                          placeholder="Username"
                          value={formState.username}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.contact")}
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.email")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      onChange={this._handleInputChange}
                      placeholder={this.context.i18n.t("messages.email")}
                      defaultValue={formState.email}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="phone" className="">
                    {this.context.i18n.t("messages.phone")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      onChange={this._handleInputChange}
                      placeholder={this.context.i18n.t("messages.phone")}
                      defaultValue={formState.phone}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.imap.settings")}
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.host")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_host"
                      name="settings.imap_host"
                      className="form-control"
                      onChange={this._handleInputChange}
                      defaultValue={formState.settings.imap_host}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.port")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_host"
                      name="settings.imap_port"
                      className="form-control"
                      onChange={this._handleInputChange}
                      defaultValue={formState.settings.imap_port}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.encryption")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_host"
                      name="settings.imap_encryption"
                      className="form-control"
                      onChange={this._handleInputChange}
                      defaultValue={formState.settings.imap_encryption}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.username")}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      id="imap_host"
                      name="settings.imap_username"
                      className="form-control"
                      onChange={this._handleInputChange}
                      defaultValue={formState.settings.imap_username}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.password")}
                  </label>
                  <div className="">
                    <input
                      type="password"
                      id="imap_host"
                      name="settings.imap_password"
                      className="form-control"
                      onChange={this._handleInputChange}
                      defaultValue={formState.settings.imap_password}
                    />
                  </div>
                </div>
                <div className={`form-group mb-2`}>
                  <label htmlFor="email" className="">
                    {this.context.i18n.t("messages.imap.settings.folder")}
                  </label>
                  <div className="">
                    <Select
                      multi={false}
                      valueKey="value"
                      labelKey="label"
                      value={formState.settings.imap_folder}
                      onChange={this.handleFolderChange}
                      options={folderOptions}
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

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

Profile.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect(state => ({
  user: getActiveUser(state)
}))(Profile);
