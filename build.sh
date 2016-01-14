#!/bin/bash
rm -rf out || exit 0;

git clone https://${GH_TOKEN}@github.com/zwernberg/upstream-frontend.git
cd upstream-frontend
bower install
git status
git config user.name "Travis-CI"
git config user.email "travis-Builder@travis"
grunt build
git add -A
git commit -m "Automated Build. [ci skip]"
git push origin master > /dev/null 2>&1 || exit 1