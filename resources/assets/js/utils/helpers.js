import React from 'react';
import { Link } from 'react-router-dom';
import { API_PATH } from '../config/_entrypoint';

export function itemToLinks(items) {
  return Array.isArray(items) ? items.map(item => createLink(item)) : createLink(items);
}

function createLink(item) {
  if ('string' !== typeof(item) || !item.includes(API_PATH)) {
    return <div key={item}>{item}</div>;
  }

  const routeWithoutPrefix = item.replace(API_PATH, '');
  const splittedRoute = routeWithoutPrefix.split('/');
  const route = '/' === routeWithoutPrefix[0] ? splittedRoute[1] : splittedRoute[0];

  return <div><Link key={item} to={`/${route}/show/${encodeURIComponent(item)}`}>{item}</Link></div>;
}

export function customFieldsHelper(object, fields, handleInputChange) {
      return Object.keys(fields).map((key, index) => {
          let thisField = fields[key];
          let input = '';
          let thisValue = null;
          let customField = _.find(object.custom_fields, (o) => o.custom_field_id === thisField.field_id);

          if (customField) {
              thisValue = customField.value;
          }

          switch (thisField.type) {
              case 'select':
              case 'picklist':
                  let options = Object.keys(thisField.options).map((option, i) => {
                      return <option key={i} value={option}>{thisField.options[option]}</option>
                  });

                  input = <select name={"custom_fields." + thisField.alias} defaultValue={thisValue} onChange={handleInputChange}>
                      <option value="">Please Select...</option>
                      {options}
                  </select>
                  break;
              case 'lookup':
              case 'text':
              default:
                  input = <input type="text" name={"custom_fields." + thisField.alias} onChange={handleInputChange} defaultValue={thisValue} placeholder={thisField.label} />
                  break;
          }

          return (
              <div key={index} className="input-container">
                  <label>{thisField.label}</label>
                  {input}
              </div>
          )
      });
}