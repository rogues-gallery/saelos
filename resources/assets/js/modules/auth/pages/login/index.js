import { connect } from 'react-redux';
import Page from './Page';
import { getAuth } from "../../store/selectors";

export default connect(state => ({
  isAuthenticated: getAuth(state)
}))(Page)