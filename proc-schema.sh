find data -type f -name "*.js" -print0 | xargs -0 sed "s/meteor\/aldeed:simple-schema/\.\.\/src\/SimpleSchema/g"

