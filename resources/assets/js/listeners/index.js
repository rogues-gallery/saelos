/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo'

window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'c9e433df9bf2ddf6d843',
    cluster: 'us2',
    encrypted: true
});

window.axios.defaults.headers.common['X-Socket-ID'] = window.Echo.socketId();

require('./app');
require('./contacts');
require('./accounts');
require('./deals');
require('./users');
require('./notes');
require('./documents');