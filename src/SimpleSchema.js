import _ from 'lodash';

export default class {
  constructor(schema) {
    this.schema = schema;
  }

  toYaml() {
    return `
    type: object
    properties:
      ${Object.keys(this.schema).toString()}
`;
  }


}
