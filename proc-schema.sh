find $1 -type f -name "*.js" | xargs sed -i '' 's/meteor\/aldeed:simple-schema/\.\.\/src\/SimpleSchema/g'

