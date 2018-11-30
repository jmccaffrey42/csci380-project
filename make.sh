#!/bin/bash

cp -R ../overlay/* .

cd project-frontend
yarn install
yarn run build

cd ../project-backend/
composer install

cd ../../
chown -R www-data:www-data current/