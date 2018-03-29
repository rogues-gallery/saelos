import { connect } from 'react-redux';
import Page from './Page';
import { getWorkflows } from '../store/selectors'

export default connect(state => ({
  workflows: getWorkflows(state)
}))(Page);