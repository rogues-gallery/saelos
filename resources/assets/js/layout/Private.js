import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { NotificationContainer } from "react-notifications";

import Main from "../Main";
import Navigation from "../common/navigation";
import TaskContainer from "../modules/activities/components/TaskContainer";

const PrivateLayout = ({ children }) => (
  <Main>
    <div className="row no-gutters">
      <Navigation />
      {children}
      <ToastContainer
        position="bottom-center"
        closeButton={false}
        hideProgressBar={true}
        toastClassName="toast"
      />
      <NotificationContainer />
    </div>
    <TaskContainer />
  </Main>
);

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateLayout;
