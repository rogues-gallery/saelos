import React from "react";
import PropTypes from "prop-types";

import ActivityGraph from "./components/ActivityGraph";
import PipelineGraph from "./components/PipelineGraph";

require("chartist-plugin-legend");

class Record extends React.Component {
  render() {
    return (
      <main className="col main-panel px-3 full-panel">
        <h4 className="border-bottom py-3">
          {this.context.i18n.t("messages.analytics")}
        </h4>
        <div className="h-scroll">
          <PipelineGraph />
          <ActivityGraph />
        </div>
      </main>
    );
  }
}

Record.contextTypes = {
  i18n: PropTypes.object.isRequired
};

export default Record;
