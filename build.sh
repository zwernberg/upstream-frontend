#!/bin/bash
rm -rf out || exit 0;

git clone -b dev "https://${GH_TOKEN}@${GH_REF}" _deploy > /dev/null 2>&1 || exit 1
cd upstream-frontend
git status
git config user.name "Travis-CI"
git config user.email "travis-Builder@upstream.dev"
cp -r ../dist/* ./dist
git add .
git commit -m "Deployed to Github"
git push origin dev > /dev/null 2>&1 || exit 1