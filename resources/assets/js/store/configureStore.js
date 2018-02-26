import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers/index';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const middlewares = [
        thunkMiddleware
    ];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const enhancer = compose(applyMiddleware(...middlewares));
    const preloadedState = loadState();
    const store = createStore(
        reducers,
        preloadedState,
        enhancer
    );

    store.subscribe(throttle(() => {
        saveState(store.getState());
    }, 1000));

    window.reduxStore = store;

    return store;
};

export default configureStore;