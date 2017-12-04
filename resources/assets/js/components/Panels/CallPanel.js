import React, { Component } from 'react';

import { Panel } from '../UI/Panel';
import Box from "../UI/Box";
import CallChart from "../Charts/Headquarters/CallChart";

export default class CallPanel extends Component {
    _togglePanelClass() {
        document.querySelector('div.my-vector').classList.toggle('call-panel-open');
    }

    render() {
        return (
            <div className="content-side-wrapper">
                <div className="call-panel-overlay side-overlay" onClick={this._togglePanelClass.bind(this)} />
                <div className="call-panel-side side-panel">
                    <Panel>
                        <div className="panel-user">
                            <div className="panel-user-content">
                                <div className="panel-user-name">Calls</div>
                                <div className="panel-user-subtitle">Inbound and Outbound call details</div>

                                <div className="panel-user-action" onClick={this._togglePanelClass.bind(this)}>
                                    <i className="md-icon">close</i>
                                </div>
                            </div>
                        </div>
                        <Box>
                            <CallChart/>
                        </Box>
                        <div>
                            <div>
                                <strong>Explanation</strong>
                                <p>Calls are currently 30% of total quota. This is significantly behind the expected call volume for the current period. Increase daily call volume to raise this number.</p>
                            </div>
                            <div>
                                <strong>Recommendation</strong>
                                <p>Increase daily calls and identify missed call opportunities. Below is a list of contacts that demonstrate an SRI greater than 0.8 and prefer phone calls as primary.</p>
                            </div>
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}
