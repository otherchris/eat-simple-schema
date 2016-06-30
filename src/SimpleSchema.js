import _ from 'lodash';
import YAML from 'js-yaml';

export default class {
  constructor(schema) {
    this.schema = schema;
  }

  getType(typeFun) {
    return `${_.toLower(typeFun.name)}`
  }

  getPropField(key, field) {
    if (field == 'type') {
      return `${field}: ${this.getType(this.schema[key][field])}`;
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
