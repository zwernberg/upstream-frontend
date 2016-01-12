#!/bin/bash
rm -rf out || exit 0;
mkdir out; 
( cd out
	git clone -b dev "https://${GH_TOKEN}@${GH_REF}" _deploy > /dev/null 2>&1 || exit 1
 git config user.name "Travis-CI"
 git config user.email "travis@nodemeatspace.com"
 cp ../dist* ./dist
 git add .
 git commit -m "Deployed to Github"
git push origin dev > /dev/null 2>&1 || exit 1
)