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

window.Echo = new Echo(options);

if (options.broadcaster === null) {
  const nullConnector = {
    socketId: function() {
      return false;
    },
    listen: function() {
      return nullConnector;
    },
    channel: function() {
      return nullConnector;
    },
    private: function() {
      return nullConnector;
    },
    join: function() {
      return nullConnector;
    },
    leave: function() {
      return nullConnector;
    },
    disconnect: function() {
      return true;
    }
  };

  window.Echo.connector = nullConnector;
}

require("./app");
require("./contacts");
require("./companies");
require("./opportunities");
