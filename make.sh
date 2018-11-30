#!/bin/bash

cp -R ../overlay/* .

cd project-frontend
yarn install
yarn run build

cd ../project-backend/
composer install
