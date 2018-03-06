import React from 'react';
import PropTypes from 'prop-types';

const List = ({ items }) => (
  <div className="col-sm-2 col-md-3 sidebar offset-md-2 pt-5">
    <div className="fixed-top">
      <form>
        <input type="search" className="form-control ds-input" id="search-input" placeholder="Search..." role="combobox" aria-autocomplete="list" aria-expanded="false" aria-owns="algolia-autocomplete-listbox-0" dir="auto" style={{position:"relative", verticalAlign:"top"}} />
      </form>
    </div>
    <div className="list-group">
      {items.map(item => <ListItem key={item.id} item={item} />)}
    </div>
  </div>
)

List.propTypes = {
  items: PropTypes.array.isRequired
}

const ListItem = ({ item }) => (
  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
    <div className="d-flex w-100 justify-content-between">
      <h5 className="mb-1">List group item heading</h5>
      <small className="text-muted">3 days ago</small>
    </div>
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small className="text-muted">Donec id elit non mi porta.</small>
  </a>
)

export default List;
