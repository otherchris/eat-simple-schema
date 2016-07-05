# eat-simple-schema

## Description
To the extent possible, generate Swagger API schema from [Meteor simple schema](https://github.com/aldeed/meteor-simple-schema) automatically.

## Installation
```bash
npm install --save eat-simple-schema
```

## Usage
- Find the schema file you want to document
- replace `aldeed:meteor/simpleschema` with `eat-simple-schema`
- find a convenient opportunity to log the output of
  `[SchemaName].toYaml([indent level])`
