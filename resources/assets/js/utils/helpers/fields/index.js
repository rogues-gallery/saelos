import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import FieldLayout from "./FieldLayout";

export const renderGroupedFields = (
  inEdit,
  order,
  groups,
  model,
  changeHandler,
  isAdmin = false,
  error = false
) =>
  order.map(key => {
    const emptyGroup =
      inEdit || (groups.hasOwnProperty(key) && groups[key].length)
        ? ""
        : "d-none";

    return (
      <ul
        key={`group-key-${key}-model-${model.id}`}
        className={`list-group list-group-flush ${emptyGroup}`}
      >
        <li className="list-group-item">
          <div className="mini-text text-muted">{key}</div>
          {_.sortBy(groups[key], ["ordering"]).map(f => {
            const hasError = error !== false && error.hasOwnProperty(f.alias);

            return (
              <FieldLayout
                model={model}
                field={f}
                inEdit={inEdit}
                error={hasError ? error[f.alias] : []}
                onChange={changeHandler}
                key={`group-field-key-${
                  typeof f.field_id === "undefined" ? f.id : f.field_id
                }-model-${model.id}`}
                isAdmin={isAdmin}
              />
            );
          })}
        </li>
      </ul>
    );
  });

renderGroupedFields.propTypes = {
  inEdit: PropTypes.bool.isRequired,
  order: PropTypes.array.isRequired,
  groups: PropTypes.array.isRequired,
  model: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

export const handleInputChange = (event, formState, customFields) => {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  let name = target.name;
  let fieldDef = _.find(customFields, f => f.alias === name);

  if (typeof fieldDef === "undefined") {
    fieldDef = {
      is_custom: false
    };
  }

  if (fieldDef.is_custom) {
    let customFieldIndex = _.findIndex(
      formState.custom_fields,
      o => o.custom_field_id === fieldDef.id
    );

    if (customFieldIndex >= 0) {
      formState.custom_fields[customFieldIndex].value = value;
    } else {
      formState.custom_fields.push({
        custom_field_id: fieldDef.id,
        value: value
      });
    }
  } else {
    _.set(formState, name, value);
  }

  return formState;
};

handleInputChange.propTypes = {
  event: PropTypes.object,
  formState: PropTypes.object,
  customFields: PropTypes.object
};
