#!/usr/bin/env bash
set -e
echo Deploying to heroku
info() { echo "$0: $1"; }
error() { info "$1"; exit 1; }

[[ "$TRAVIS" ]] || error "This script assumes its running within Travis"
[[ "$TRAVIS_PULL_REQUEST" == "true" ]] && error "Not deploying pull requests"
[[ "$TRAVIS_BRANCH" == "master" ]] || error "Unsupported branch $TRAVIS_BRANCH"

git config --global user.name "Dan Haywood"
git config --global user.email "dhaywood@wisc.edu"
ssh-keyscan -t rsa heroku.com >> ~/.ssh/known_hosts 2>/dev/null
gem install heroku
echo yes | heroku keys:add
grunt build
mv dist/index.html dist/index.php
grunt buildcontrol:heroku
heroku keys:remove "$(< ~/.ssh/id_rsa.pub)"