import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import reducers from './reducers';
import { routes } from './routes';
import { actionCreators } from "./actions";

function configureStore(initialState) {
      const enhancer = compose(applyMiddleware(thunkMiddleware));
      return createStore(reducers, initialState, enhancer);
}

const store = configureStore({authState: {authenticated: true}});

store.dispatch(actionCreators.isUserAuthenticated());

window.reduxStore = store;

class App extends Component {
    render() {
        return (
            <Provider store={window.reduxStore}>
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