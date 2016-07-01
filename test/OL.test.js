import { chai } from 'chai';
import * as OL from './data/OL'

Object.keys(OL).forEach((key) => {
  OL[key].swag_name = key;
});

console.log("swagger: '2.0'\n");
console.log("defintions:");
Object.keys(OL).forEach((key) => {
  console.log(OL[key]);
  console.log(OL[key].toYaml(2));
});
