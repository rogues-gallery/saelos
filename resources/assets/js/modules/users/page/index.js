import { connect } from "react-redux";
import Page from "./Page";
import {
  getUsers,
  getPaginationForUsers,
  getSearchStringForUsers
} from "../store/selectors";

export default connect(state => ({
  users: getUsers(state),
  pagination: getPaginationForUsers(state),
  searchString: getSearchStringForUsers(state)
}))(Page);
