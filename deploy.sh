#!/usr/bin/env sh

# abort on errors
set -e

# build
ng build --prod --base-href /angular-rubik-cube/

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:crojasaragonez/vue-rubik-cube master:gh-pages

cd -
