require('babel-polyfill');
require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import App from './Application';
import { CookiesProvider } from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';

render(
    <CookiesProvider>
        <App />
    </CookiesProvider>,
    document.getElementById('root')
);

registerServiceWorker();

require('./listeners');