import { createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
    const enhancer = compose(applyMiddleware(thunkMiddleware));
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