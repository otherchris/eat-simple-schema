#! /usr/local/bin/zsh

echo "Remove old data"
rm -rf data

echo "Get schema sources from $1"
ruby getSchema.rb $1 data

echo "Replace dependencies"
./proc-schema.sh data
