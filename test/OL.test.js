import { chai } from 'chai';
import * as OL from './data/OL'

Object.keys(OL).forEach((key) => {
  OL[key].swag_name = key;
});


console.log(Object.keys(OL));
console.log(OL.OrderLinesSchema.toYaml(0));
