import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from './routes';
import { actionCreators } from "./actions";
import configureStore from './configureStore';

const store = configureStore();

store.dispatch(actionCreators.isUserAuthenticated());

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        {routes.map((route, index) => {
                            return <Route key={index} path={route.path} component={route.component} exact={route.exact}/>
                        })}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

App.propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired
}

export default withCookies(App);