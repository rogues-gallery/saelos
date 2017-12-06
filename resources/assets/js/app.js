require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Application';
import { CookiesProvider } from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>
    , document.getElementById('root'));
registerServiceWorker();

document.addEventListener('focusin', function (e) {
    let parentNode = e.target.parentNode;

    if (parentNode.classList.contains('input-container')) {
        parentNode.classList.toggle('focused');
    }
});

document.addEventListener('focusout', function (e) {
    let parentNode = e.target.parentNode;

    if (parentNode.classList.contains('input-container')) {
        parentNode.classList.toggle('focused');
    }
});