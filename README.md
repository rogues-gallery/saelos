Saelos
======

### Requirements

- PHP 7.1+
- MySQL
- [A Pusher account](https://pusher.com)

### Installation

- `git clone git@github.com:dbhurley/saelos .`
- Create a database for the app
- Copy `.env.example` to `.env` and update accordingly
- `composer install`
- `php artisan migrate`
- `php artisan key:generate`
- `php artisan passport:keys`
- `npm install`
- `npm run prod`
- Set your web root to the `public/` directory of your installation.