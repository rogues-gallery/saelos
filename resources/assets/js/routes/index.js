// import libs
import React from "react";
import { Router, Switch } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

// import components
import routes from "./routes";
import PrivateRoute from "./Private";
import ConfigRoute from "./Config";
import Layout from "../layout";

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Layout>
      <Switch>
        {routes.map((route, i) => {
          if (route.auth) {
            if (route.config) {
              return <ConfigRoute key={i} {...route} />;
            }

            return <PrivateRoute key={i} {...route} />;
          }

          return <ConfigRoute key={i} {...route} />;
        })}
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
