Saelos
======

### Requirements

- PHP 7.1+
- MySQL
- [A Pusher account](https://pusher.com)

### Installation

- `git clone git@github.com:mautic/saelos .`
- Create a database for the app
- Copy `.env.example` to `.env` and update accordingly
- `composer install`
- `php artisan migrate`
- `npm install`
- `npm run prod`