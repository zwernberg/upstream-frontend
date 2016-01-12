#!/bin/bash
rm -rf out || exit 0;
git config user.name "Travis-CI"
git config user.email "travis@upstream.com"
git remote add upstream "https://$GH_TOKEN@github.com/zwernberg/upstream-frontend.git"
git add .
git commit -m "successful travis build $TRAVIS_BUILD_NUMBER"
git push -fq upstream dev > /dev/null