#! /bin/bash
if [ -d './build' ]; then
  echo 'Build directory exists, removing...'
  rm -rf ./build
fi

echo 'Making build dir...'
mkdir build

echo 'Changing dir...'
cd build

echo 'Cloning...'
git clone --depth 1 git@github.com:saelos/saelos .
echo 'Cloning finished.'

echo 'Composer install...'
composer install --no-dev --quiet

echo 'NPM install...'
npm --silent install

echo 'Building app...'
npm run --silent prod

echo 'Packaging...'
rm build.sh
rm package-lock.json
rm package.json
rm phpunit.xml
rm -rf resources/assets/js
rm -rf resources/assets/sass
rm -rf node_modules
rm -rf tests
rm server.php
rm webpack.mix.js
rm .babelrc
rm .gitignore
rm .gitattributes
rm -rf .git
rm -rf .github


echo 'Compressing and zipping...'
tar -czf ../saelos_full_install.tar.gz ./

echo 'Removing previous build dir...'
rm -rf build

echo 'Packaging Complete.'