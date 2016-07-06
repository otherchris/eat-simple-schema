#! /usr/local/bin/zsh

echo "Remove old data"
rm -rf src/data
rm -f temp

echo "Get schema sources from $1"
ruby getSchema.rb $1 src/data >> temp
mv temp src/data/collect.js

echo "Replace dependencies"
./proc-schema.sh src/data

echo "Replace Enums"
mkdir -p src/App/Enums
cp -r $2/* src/App/Enums

echo "YAML conversion"
