![Saelos](http://dbhurley.com/media/uploads/2018/04/Saelos-v3-Final.002.png)

# Saelos

### Requirements

- PHP 7.1+
- MySQL 5.7.8+ or MariaDB 10.2.7+ (due JSON Datatype support)

### Installation

- Download the latest release from the releases tab.
- Unzip in a web accessible directory.
- Navigate to your site.
- Follow installation instructions.
- Set up the following cron on your server: `* * * * * /usr/bin/env php /path/to/saelos/artisan schedule:run`

# Development

Saelos uses `prettier` with its default settings for code style formatting. [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Developer Installation

- Clone this repository
- run `composer install && npm install && npm run watch`
- Nav to site and go through install process.

## Notifications

Saelos supports both [Pusher](https://pusher.com) and [Socket.IO](https://socket.io) for in app notifications.

### Pusher Setup

Pusher is a good option for notifications if you want to get up and running quickly. The service is free up to 100,000 notifications per day, so it should meet the notification needs of most medium-sized Saelos installations.

To get started, create a pusher account and a new Channel App to get your credentials. You're going to need the `app_id`, `app_key`, `app_secret`, and know which cluster your app is running in. (All of these settings are available after creating an app.) Enter those values in the appropriate places within your `.env` file at the root of your Saelos directory, and you're good to go.

### Socket.IO Setup

Handling in app notifications with Socket.IO requires a bit of techinical setup, but is an Open Source alternative to Pusher.

#### Requirements

- Redis Server
- Node Server

##### Configuration

If your Saelos server allows you to run Node along side of PHP and it has Redis installed, the setup process is fairly straigtforward. Enter your Redis settings inside of your `.env`:

```
BROADCAST_DRIVER=redis
REDIS_BROADCAST_URL=http://YourBroadcastUrl
REDIS_BROADCAST_PORT=6001
```

##### Running the Broadcast Server

Start the notifications server by running the `npm run notification-server` command. If everything is set up correctly, you'll see output similar to:

```
dgilbert ~/Sites/saelos (master) $ npm run notification-server

> @ notification-server /Users/dgilbert/Sites/saelos
> node websocket.js


L A R A V E L  E C H O  S E R V E R

version 1.3.6

⚠ Starting server in DEV mode... // <-- Only shows if you're APP_DEBUG is set to true in .env

✔  Running at http://laelos.test on port 6001
✔  Channels are ready.
✔  Listening for http events...
✔  Listening for redis events...
```

If you're missing that last line (`✔ Listening for redis events...`), then there is a misconfiguration
for your redis server that you'll need to debug. If everything looks good, go ahead an navigate to your
Saelos installation in your browser. Once loaded, you should see something similar to `[9:44:57 AM] - DSx0QG5SGhaseyu_AAAA joined channel: saelos` in your terminal where you ran the `npm run notification-server` command.

You can test the notification system by opening `http://YourSaelos/notification_test` in your browser while logged into Saelos. You'll see the notification in the top right of your screen. If you do, you're all set!

##### Redis Wrap Up

The last thing you'll need to do for Socket.IO is to run your Node server as a daemon. There are various ways to do this depending on the server you're running on, but the most common would be [Supervisor](http://supervisord.org/introduction.html). The basic `supervisord` config would be:

```
[program:saelos-notifications]
command=/path/to/node /path/to/your/saelos/websocket.js
```
