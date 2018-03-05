import { connect } from 'react-redux';
import Page from './Page';
import { getOpportunities } from '../../store/selectors'

export default connect(state => ({
    opportunities: getOpportunities(state)
}))(Page);