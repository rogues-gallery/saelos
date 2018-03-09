Saelos
======

### Requirements

- PHP 7.1+
- MySQL
- [A Pusher account](https://pusher.com)

### Installation

- `git clone git@github.com:dbhurley/saelos`
- `cd saelos`
- Create a database for the app
- Copy `.env.example` to `.env` and update accordingly
- Add your `PUSHER_APP_ID` and `PUSHER_APP_KEY` and `PUSHER_APP_SECRET` to `.env`
- `composer install`
- `php artisan migrate`
- `php artisan key:generate`
- `php artisan passport:keys`
- `php artisan passport:client --password`
- Using the results from the previous line, add `PASSPORT_CLIENT_ID` and `PASSPORT_CLIENT_SECRET` to your `.env` file
- `npm install`
- `npm run prod`
- Set your web root to the `public/` directory of your installation.