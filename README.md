# eat-simple-schema

## Description
To the extent possible, generate Swagger API schema from [Meteor simple schema](https://github.com/aldeed/meteor-simple-schema) automatically.

## Installation

## Usage
- To produce YAML schema definitions suitable for use in a Swagger API, use
  ```bash
  ./gen-docs.sh [ROOT PATH] [PATH TO ENUMS]
  ```:w
- This will attempt to process any file under the ROOT PATH that ends in "chema.js"

## Issues
- In CampaignsSchema, the unknown schema types TargetTypesSchema and CreativeTypesSchema are used, leading to `$ref: "#/definitions/undefined"` in the output.
