import React, { Component } from 'react';
import Box from '../UI/Box';
import Backend from '../Layouts/Backend';
import PageHeader from '../Helpers/PageHeader';
import { StagesChart, LeadsCreatedChart, GaugeChart, OpportunitiesChart } from "../Charts";
import Progress from "../UI/Progress";
import {actionCreators} from "../../actions";

export default class Dashboard extends Component {
    componentWillMount() {
        // preload
        this.props.dispatch(actionCreators.fetchContacts());
        this.props.dispatch(actionCreators.fetchAccounts());
        this.props.dispatch(actionCreators.fetchOpportunities());
        this.props.dispatch(actionCreators.fetchReports());
        this.props.dispatch(actionCreators.fetchContactCustomFields());
        this.props.dispatch(actionCreators.fetchOpportunityCustomFields());
        this.props.dispatch(actionCreators.fetchAccountCustomFields());
        this.props.dispatch(actionCreators.fetchRepCustomFields());
        this.props.dispatch(actionCreators.fetchStages());
    }

    render() {
        return (
            <Backend>
                <div className="content-inner no-padding-top no-padding-left no-padding-right">
                    <PageHeader />

                    <Box title="OPPORTUNITIES IN STAGE" classes="bordered">
                        <StagesChart />
                    </Box>

                    <div className="flex-row-even">
                        <Box title="CONTACTS CREATED" classes="bordered">
                            <LeadsCreatedChart />
                        </Box>
                        <Box title="SALES LEADERBOARD" classes="bordered">
                            <Progress size={76} description="Alex: $35,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                            <Progress size={69} description="Morgan: $30,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                            <Progress size={55} description="Andy: $20,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                            <Progress size={49} description="Chris: $18,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                            <Progress size={32} description="Katie: $10,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                            <Progress size={21} description="Matt: $8,000 in closed opportunities" showStatus={true} showAvatar={true}/>
                        </Box>
                    </div>

                    <div className="flex-row-even">
                        <Box title="COMMUNICATIONS" classes="bordered">
                            <div className="gauge-charts flex-row-even">
                                <GaugeChart data={{series: [35, 25, 40]}} />
                                <GaugeChart data={{series: [65, 35]}} />
                                <GaugeChart data={{series: [35, 25, 40]}} />
                            </div>
                        </Box>
                        <Box title="WINS TODAY" classes="bordered">
                            <div className="jumbo text-center">2</div>
                        </Box>
                    </div>

                    <Box title="OPPORTUNITIES" classes="bordered">
                        <OpportunitiesChart />
                    </Box>
                </div>
            </Backend>
        );
    }
}