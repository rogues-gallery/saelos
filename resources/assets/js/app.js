require('babel-polyfill');
require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import App from './Application';
import registerServiceWorker from './registerServiceWorker';

render(
    <App />,
    document.getElementById('root')
)

registerServiceWorker();

require('./listeners');