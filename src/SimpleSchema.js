import _ from 'lodash';

export default class {
  constructor(schema) {
    this.schema = schema;
  }
  getProp(key) {
    return key;
  }
  getProps() {
    let out = ``
    _.keys(this.schema).forEach((key) => {
      out += `${this.getProp(key)}
      `;
    });
    return _.trim(out);
  }
  toYaml() {
    return `
    type: object
    properties:
      ${this.getProps()}
`;
  }


}
