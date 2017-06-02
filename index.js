'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
  foo: String
  hello: String
}

type Schema {
  query: Query
}
`)

const resolvers = {
  foo: () => 'bar',
  hello: () => 'what up world',
};

const query = `
query myFirstQuery {
  foo
}
`;

const q = (x) => `
query dynQuery {
  ${x}
}
`

// graphql(schema, query, resolvers)
//   .then(result => console.log(result))
//   .catch(error => console.log(error));
// graphql(schema, q('foo'), resolvers)
graphql(schema, q(process.env.Q), resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));
