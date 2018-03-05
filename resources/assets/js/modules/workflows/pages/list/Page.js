import React from 'react';
import PropTypes from 'prop-types';
import { fetchWorkflows, fetchWorkflow } from "../../service";

class Page extends React.Component {
    componentWillMount() {
        this.props.dispatch(fetchWorkflows())
    }

    render() {
        return (
            <div className="container">
                {this.props.workflows.map(workflow => <Workflow key={workflow.id} workflow={workflow} dispatch={this.props.dispatch} />)}
            </div>
        )
    }
}

Page.propTypes = {
    workflows: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const Workflow = ({ workflow, dispatch }) => {
    return (
        <div className="workflow" onClick={() => dispatch(fetchWorkflow(workflow.id))}>
            {workflow.name}
        </div>
    );
}

Workflow.propTypes = {
    workflow: PropTypes.object.isRequired
};

export default Page;