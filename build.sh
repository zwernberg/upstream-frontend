#!/bin/bash
rm -rf out || exit 0;

git clone  "https://${GH_REF}" > /dev/null 2>&1 || exit 1
cd upstream-frontend
git checkout dev
git status
git config user.name "Travis-CI"
git config user.email "travis-Builder@upstream.dev"
cp -r ../dist/* ./dist
git add .
git commit -m "Deployed to Github"
git push "https://${GH_TOKEN}@$GITHUB_REPO" dev > /dev/null 2>&1 || exit 1