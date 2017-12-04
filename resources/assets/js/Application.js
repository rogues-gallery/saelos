import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import * as types from './actions/types';

import reducers from './reducers';
import { routes } from './routes';

function configureStore(initialState) {
      const enhancer = compose(applyMiddleware(thunkMiddleware));
      return createStore(reducers, initialState, enhancer);
}

const store = configureStore({});

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    componentWillMount() {
        const { cookies } = this.props;

        let token = cookies.get('token');

        if (token) {
            store.dispatch({type: types.AUTH_USER});
        }

        let cookieTimeout = setInterval(function() {
            let tmpCookies = new Cookies();

            token = tmpCookies.get('token');

            if (!token && /\/login/.test(window.location.href) === false) {
                clearInterval(cookieTimeout);
                window.location.href = '/login';
            }
        }, 1000);
    }

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

export default withCookies(App);