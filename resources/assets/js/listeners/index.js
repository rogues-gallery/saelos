import Echo from "laravel-echo";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */
let options = window.ECHO_CONFIG || {};

/**
 * Since we support both Pusher & Socket.IO, we must import both libs
 * into the compiled Saelos application. If you want to optimize your
 * build, you can remove whichever of these you are not going to be using.
 */
options.client = require("socket.io-client");
window.Pusher = require("pusher-js");

window.Echo = window.ECHO_CONFIG !== false ? new Echo(options) : {};
window.axios.defaults.headers.common["X-Socket-ID"] = window.Echo.socketId();

require("./app");
require("./contacts");
require("./companies");
require("./opportunities");
