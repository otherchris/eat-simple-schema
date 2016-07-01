import { chai } from 'chai';
import * as OL from './data/OL'

console.log(Object.keys(OL.OrderLinesSchema.schema));
console.log(OL.OrderLinesSchema.toYaml(0));
