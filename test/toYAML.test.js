import SimpleSchema from '../SimpleSchema';
var expect = require('chai').expect;


console.log(SimpleSchema);
const BookSchema = new SimpleSchema({
  title: {
    type: String,
    label: "Title of the book",
  },
  pages: {
    type: Number,
    label: "Number of pages",
    optional: true,
  },
  timesRead: {
    type: Number, //Make this an integer in the JSON Schema
    label: "How many times the book has been read",
    decimal: true,
    optional: true,
  },
  borrowers: {
    type: [[String]], //Don't ask me why borrowers is a nested array
    label: "Who borrowed it",
    optional: true,
  }
});

describe('', () => {
  it('', () => {
    expect(BookSchema.toYaml()).to.equal(
`
    type: object
    properties:
      title:
        type: string
        label: Title of the book
      pages:
        type: integer
        label: Number of pages
      timesRead:
        type: number
        label: How many times the book has been read
      borrowers:
        type: array
        items:
          type: array
          items:
            type: string
        label: Who borrowed it
    required:
    - title
`
    );
  });
});
