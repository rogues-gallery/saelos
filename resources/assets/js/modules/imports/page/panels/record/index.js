import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Select from "react-select";
import Dropzone from "react-dropzone";
import PapaParse from "papaparse";
import _ from "lodash";
import { saveImport } from "../../../service";
import { getFields } from "../../../../fields/store/selectors";

class Record extends Component {
  state = {
    csvColumns: [],
    formState: {}
  };

  handleInputChange = event => {
    const { target } = event;
    const { name, value } = target;
    const formState = Object.assign({}, this.state.formState);

    _.set(formState, name, value);

    this.setState({
      formState
    });
  };

  handleObjectChange = selection => {
    const event = {
      target: {
        name: "entity_type",
        value:
          selection && selection.hasOwnProperty("value")
            ? selection.value
            : null
      }
    };

    this.handleInputChange(event);
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    const event = {
      target: {
        name: "file",
        value: acceptedFiles[0]
      }
    };

    this.handleInputChange(event);

    let reader = new FileReader();

    reader.onload = event => {
      const csvData = PapaParse.parse(event.target.result, {
        error: e => console.log(e)
      });

      this.setState({
        csvColumns: csvData.data[0]
      });
    };

    reader.readAsText(acceptedFiles[0]);
  };

  handleFieldMappingChange = (column, value) => {
    const event = {
      target: {
        name: `field_mapping.${column}`,
        value: value
      }
    };

    this.handleInputChange(event);
  };

  submit = () => {
    this.props.dispatch(saveImport(this.state.formState));
    this.reset();
  };

  reset = () => {
    this.setState({
      csvColumns: [],
      formState: {}
    });
  };

  render() {
    const { fields } = this.props;
    const { formState, csvColumns } = this.state;

    const objectOptions = [
      {
        value: "App\\Company",
        label: this.context.i18n.t("messages.company")
      },
      {
        value: "App\\Contact",
        label: this.context.i18n.t("messages.contact")
      },
      {
        value: "App\\Opportunity",
        label: this.context.i18n.t("messages.opportunity")
      }
    ];

    const fieldOptions = fields
      .filter(field => field.model === formState.entity_type)
      .map(field => ({
        value: field.alias,
        label: field.label
      }))
      .sort((a, b) => {
        if (a.label < b.label) {
          return -1;
        }

        if (a.label > b.label) {
          return 1;
        }

        return 0;
      });

    return (
      <main className="col main-panel px-3">
        <div className="list-inline pt-3 float-right">
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={this.reset}
          >
            {this.context.i18n.t("messages.reset")}
          </button>
          <button
            className="btn btn-primary list-inline-item"
            onClick={this.submit}
          >
            {this.context.i18n.t("messages.save")}
          </button>
        </div>
        <h4 className="border-bottom py-3">
          {this.context.i18n.t("messages.generic.new", {
            type: this.context.i18n.t("messages.import")
          })}
        </h4>
        <div className="h-scroll">
          <div className="card mb-1">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">
                  {this.context.i18n.t("messages.options")}
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="model">
                    {this.context.i18n.t("messages.object")}
                  </label>
                  <div>
                    <Select
                      options={objectOptions}
                      value={formState.entity_type}
                      valueKey="value"
                      labelKey="label"
                      onChange={this.handleObjectChange}
                    />
                  </div>
                </div>
              </li>
              {formState.entity_type && (
                <li className="list-group-item">
                  <Dropzone
                    onDrop={this.handleDrop}
                    className="csv-dropzone"
                    activeClassName="active"
                    acceptClassName="accept"
                    rejectClassName="reject"
                    accept="text/csv"
                  >
                    <div className="dropzone">
                      <p>
                        {this.context.i18n.t("messages.import.drop_to_upload")}
                      </p>
                      <button className="btn btn-primary">
                        {this.context.i18n.t("messages.import.click_to_select")}
                      </button>
                    </div>
                  </Dropzone>
                </li>
              )}
              {formState.file && (
                <li className="list-group-item">
                  <div className="mini-text text-muted mb-2">
                    {this.context.i18n.t("messages.import.field_mapping")}
                  </div>
                  {csvColumns &&
                    csvColumns.map((col, index) => (
                      <div className="form-group mb-2" key={index}>
                        <label>{col}</label>
                        <Select
                          options={fieldOptions}
                          valueKey="value"
                          labelKey="label"
                          value={_.get(formState.field_mapping, col)}
                          onChange={selection => {
                            const value =
                              selection && selection.hasOwnProperty("value")
                                ? selection.value
                                : null;

                            this.handleFieldMappingChange(col, value);
                          }}
                        />
                      </div>
                    ))}
                </li>
              )}
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

Record.propTypes = {
  fields: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

Record.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default connect(state => ({
  fields: getFields(state)
}))(Record);
