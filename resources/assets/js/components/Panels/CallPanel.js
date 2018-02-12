import React from 'react';
import { Panel } from '../UI/Panel';
import Box from "../UI/Box";
import CallChart from "../Charts/Headquarters/CallChart";
import { togglePanel } from '../../utils/helpers';

const CallPanel = () => {
    const togglePanelClass = () => {
        togglePanel('div.my-vector', 'call-panel-open');
    };

    return (
        <div className="content-side-wrapper">
            <div className="call-panel-overlay side-overlay" onClick={togglePanelClass} />
            <div className="call-panel-side side-panel">
                <Panel>
                    <div className="panel-user">
                        <div className="panel-user-content">
                            <div className="panel-user-name">Calls</div>
                            <div className="panel-user-subtitle">Inbound and Outbound call details</div>

                            <div className="panel-user-action" onClick={togglePanelClass}>
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
};

export default CallPanel;