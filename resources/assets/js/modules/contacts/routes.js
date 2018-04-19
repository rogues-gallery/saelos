import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Page from "./page";
import {
  getFirstContactId,
  getSearchStringForContacts
} from "./store/selectors";
import Main from "../../Main";
import * as MDIcons from "react-icons/lib/md/index";
import { getViews } from "../users/store/selectors";
import { fetchContacts } from "./service";

let MyRedirect = ({ firstId }) => {
  // update search state to === ''

  return (
    <Main>
      <Redirect to={`/contacts/${firstId}`} />
    </Main>
  );
};

const RedirectToFirst = connect(state => ({
  firstId: getFirstContactId(state)
}))(MyRedirect);

const navToSearch = ({ searchString }, dispatch, router) => {
  dispatch(fetchContacts({ page: 1, searchString }));

  return router.history.push(`/contacts`);
};

const ViewsList = ({ views, dispatch, searchString, location }, { router }) => {
  return (
    <li className="nav-item">
      <ul className="nav">
        {views.map((v, i) => {
          //@TODO Review implementation here for optimization.
          let emojis = v.linkText.match(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
          let viewDisplay =
            emojis instanceof Array ? (
              <span>
                <span className="emoji">{emojis[0]}</span>{" "}
                {_.replace(v.linkText, emojis[0], "")}
              </span>
            ) : v.color ? (
              <span>
                <span
                  className="dot mr-2"
                  style={{ backgroundColor: v.color }}
                />{" "}
                {v.linkText}
              </span>
            ) : (
              <span>
                <span className="dot mr-2" />
                {v.linkText}
              </span>
            );
          return (
            <li className="nav-item" key={i}>
              <a
                className={`nav-link pl-3 ml-1 small ${
                  v.searchString === searchString &&
                  /contacts/.test(location.pathname)
                    ? "active"
                    : ""
                }`}
                href="javascript:void(0)"
                onClick={() => navToSearch(v, dispatch, router)}
              >
                {viewDisplay}
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

ViewsList.propTypes = {
  views: PropTypes.array.isRequired
};

ViewsList.contextTypes = {
  router: PropTypes.object.isRequired
};

const ViewsMenu = withRouter(
  connect(state => ({
    views: getViews(state, "contacts"),
    searchString: getSearchStringForContacts(state)
  }))(ViewsList)
);

export default [
  {
    path: "/",
    exact: true,
    auth: true,
    component: RedirectToFirst
  },
  {
    path: "/contacts",
    exact: true,
    auth: true,
    component: RedirectToFirst,
    menu: {
      icon: MDIcons.MdPersonOutline,
      location: "main",
      linkText: "Contacts",
      subLinks: ViewsMenu,
      roles: false
    }
  },
  {
    path: "/contacts/:id",
    exact: true,
    auth: true,
    component: Page
  }
];
