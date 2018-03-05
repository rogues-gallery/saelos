import { connect } from 'react-redux';
import Page from './Page';

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated
}))(Page)