#!/bin/bash
rm -rf out || exit 0;
git config user.name "Travis-CI"
git config user.email "travis@upstream.com"
git add .
git commit -m "successful travis build $TRAVIS_BUILD_NUMBER"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
