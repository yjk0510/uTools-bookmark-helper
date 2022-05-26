#!/bin/bash
echo '开始同步文件'
current_path=`pwd`
echo '同步pinyin-pro'
rm -rf ./public/lib/pinyin-pro
cd ./node_modules/pinyin-pro
rm -rf data test lib types .eslinttc .travis.yml CHANGELOG.md LICENSE package.json README.md tsconfig.json .eslintrc ./dist/index.esm.js
cd ${current_path}
cp -r ./node_modules/pinyin-pro/ ./public/lib/pinyin-pro
echo 'pinyin-pro完成'