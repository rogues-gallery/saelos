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
          route.key = i;

          if (route.auth) {
            if (route.config) {
              return <ConfigRoute {...route} />;
            }

            return <PrivateRoute {...route} />;
          }

          return <ConfigRoute {...route} />;
        })}
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
