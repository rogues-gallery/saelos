import { connect } from "react-redux";
import Page from "./Page";
import {
  getStatuses,
  getPaginationForStatuses,
  getSearchStringForStatuses
} from "../store/selectors";

export default connect(state => ({
  statuses: getStatuses(state),
  pagination: getPaginationForStatuses(state),
  searchString: getSearchStringForStatuses(state)
}))(Page);
