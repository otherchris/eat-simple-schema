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
- create a script that will load your modified SimpleSchema and log the YAML.
  For example:
```javascript
import * as OL from 'api/OrderLines/schema';

//Give each schema a 'swag_name' prop that holds the identifier
Object.keys(OL).forEach((key) => {
  OL.swag_name = key;
});

//log the YAML to the console
Object.values(OL).forEach((val) => {
  console.log(val.swag_name)
  console.log(val.toYaml(2));
});
```
