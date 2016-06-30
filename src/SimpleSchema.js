import _ from 'lodash';

export default class {
  constructor(schema) {
    this.schema = schema;
  }

  getSimpleType(key, typeFun) {
    if (typeFun.name == 'Number') {
      return `type: ${this.schema[key].decimal ? `number` : `integer`}`;
    }
    else {
      return `type: ${_.toLower(typeFun.name)}`;
    }
  }

  getArrayType(key, typeFun) {
    return `type: array
              items:
                ${this.getType(key, typeFun[0])}`;
  }

  getType(key, typeFun) {
    console.log(key);
    if(typeFun[0]) {
      return this.getArrayType(key, typeFun);
    }
    if (typeFun.name != 'Object') {
      return this.getSimpleType(key, typeFun);
    }
    return ``;
  }

  getPropField(key, field) {
    if (field == 'type') {
      return `${this.getType(key, this.schema[key][field])}`;
    }
    return `${field}: ${this.schema[key][field]}`;
  }

  // schema, string => template literal
  getProp(key) {
    let out = ``;
    out += `${this.getPropField(key, 'type')}
        `;
    out += this.getPropField(key, 'label');
    return _.trim(out);
  }

  // schema => template literal
  getProps() {
    let out = ``
    _.keys(this.schema).forEach((key) => {
      out += `${key}:
      `;
      out += `  ${this.getProp(key)}
      `;
    });
    return _.trim(out);
  }

  // schema => template literal
  toYaml() {
    return `
    type: object
    properties:
      ${this.getProps()}
`;
  }


}
