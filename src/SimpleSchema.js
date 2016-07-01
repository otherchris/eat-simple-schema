import _ from 'lodash';

export default class {
  constructor(schema) {
    this.schema = schema;
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
    if(!typeFun) {
      return ``
    }
    if(typeFun[0]) {
      return this.getArrayType(key, typeFun, t);
    }
    if (typeFun.name != 'Object') {
      return this.getSimpleType(key, typeFun, t);
    }
    return ``;
  }

  getPropField(key, field, t) {
    if (field == 'type') {
      return this.getType(key, this.schema[key][field], t);
    }
    return this.line(t, `${field}: ${this.schema[key][field]}`);
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
    let out = ``
    _.keys(this.schema).forEach((key) => {
      out += this.line(t, `${key}:`);
      out += this.getProp(key, t+2);
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
    out += this.line(t, `required:`);
    reqs.forEach((key) => {
      out += this.line(t, `- ${key}`);
    });
    return out;
  }

  // schema => template literal
  toYaml(t) {
    let out = ``;
    out += this.line(t, `type: object`);
    out += this.line(t, `properties:`);
    out += this.getProps(t + 2);
    out += this.getReq(t);
    return out;
  }


}
