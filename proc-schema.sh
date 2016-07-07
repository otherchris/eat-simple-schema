find $1 -type f -name "*.js" | xargs sed -i '' 's/meteor\/aldeed:simple-schema/\.\.\/SimpleSchema/g'
find $1 -type f -name "*.js" | xargs sed -i '' 's/{ SimpleSchema } /SimpleSchema /g'
find $1 -type f -name "*.js" | xargs sed -i '' 's/\.\.\/\(.*\)\/schema/\.\/\1\.schema/g'
find $1 -type f -name "*.js" | xargs sed -i '' 's/\.\.\/\(.*\)\/\(.*Schema\)\([^a-zA-Z]\)/\.\/\1\.\2\3/g'

