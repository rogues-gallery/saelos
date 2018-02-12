import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { routes } from './routes';
import configureStore from './configureStore';

const store = configureStore();

const App = () => (
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

export default App;