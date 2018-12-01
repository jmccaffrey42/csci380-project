#!/bin/bash

cd project-frontend
yarn install
yarn run build

cd ../project-backend/
composer install
