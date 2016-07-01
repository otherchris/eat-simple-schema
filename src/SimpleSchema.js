import "babel-polyfill"
import _ from 'lodash';
//import SimpleSchema from 'meteor/aldeed:meteor-simple-schema

export default class SimpleSchema {
  constructor(schema) {
    this.schema = schema;
    this.context = {};

  }

  ind(x) {return Array(x + 1).join(' ');}

  line(t, content) {
    return `${this.ind(t)}${content}\n`;
  }

  getSimpleType(key, typeFun, t) {
    if (typeFun.name == 'Number') {
      return this.line(t, `type: ${this.schema[key].decimal ? `number` : `integer`}`);
    }
    else {
      return this.line(t, `type: ${_.toLower(typeFun.name)}`);
    }
  }

  getArrayType(key, typeFun, t) {
    let out = ``
    out += this.line(t, `type: array`);
    out += this.line(t, `items:`);
    out += this.getType(key, typeFun[0], t + 2);
    return out;
  }

  getType(key, typeFun, t) {
    let simpleTypes = ['String', 'Number', 'Boolean'];
    if(!typeFun) {
      return ``
    }
    if(typeFun[0]) {
      return this.getArrayType(key, typeFun, t);
    }
    if (_.indexOf(simpleTypes, typeFun.name) >= 0) {
      return this.getSimpleType(key, typeFun, t);
    }
    if (typeFun.swag_name) {
      return this.line(t, `$ref: '#/definitions/${typeFun.swag_name}'`);
    }
    _.keys(this.schema).forEach((_key) => {
      if(_key.includes(key + '.')) {
        typeFun[(/\.(.*)/).exec(_key)[1]] = this.schema[_key];
      }
    })
    return (new SimpleSchema(typeFun)).toYaml(t - 2);
  }

  getPropField(key, field, t) {
    if (field == 'type') {
      return this.getType(key, this.schema[key][field], t);
    }
    if (field == 'label') {
      return this.line(t, `description: ${this.schema[key][field]}`);
    }
    return this.line(t, `${key}: ${this.schema[key][field]}`);
  }

  // schema, string => template literal
  getProp(key, t) {
    if (!this.schema[key]) { //skip if prop is empty
      return ``;
    }
    let out = ``;
    out += this.getPropField(key, 'type', t);
    out += this.getPropField(key, 'label', t);
    return out;
  }

  // schema => template literal
  getProps(t) {
    let out = this.line(t, `properties:`);
    _.keys(this.schema).forEach((key) => {
      if (!key.includes('.')) {
        out += this.line(t + 2, `${key}:`);
        out += this.getProp(key, t + 4);
      }
    });
    return out;
  }

  getReq(t) {
    const reqs = [];
    let out = ``;
    _.keys(this.schema).forEach((key) => {
      if (!this.schema[key]) { //skip if prop is empty
        return ``;
      }
      if (!this.schema[key].optional) {
        reqs.push(key);
      }
    });
    if (reqs.length > 0) {
      out += this.line(t, `required:`);
      reqs.forEach((key) => {
        out += this.line(t, `- ${key}`);
      });
    }
    return out;
  }

  // schema => template literal
  toYaml(t) {
    let out = ``;
    if(this.swag_name) {
      out += this.line(t, `${this.swag_name}:`);
    }
    out += this.line(t + 2, `type: object`);
    out += this.getProps(t + 2);
    out += this.getReq(t + 2);
    return out;
  }
}

