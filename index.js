'use strict';

const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
  id: ID
  title: String
  duration: Int
  watched: Boolean
  foo: String
}

type Schema {
  query: Query
}
`)

const resolvers = {
  foo: () => 'bar',
  hello: () => 'what up world',
  id: () => 'some id',
  title: () => 'foo bar',
  duration: () => 180,
  watched: () => true,
};

const query = `
query myFirstQuery {
  foo
  id
  title
  duration
  watched
}
`;

const q = (x) => `
query dynQuery {
  ${x}
}
`

graphql(schema, query, resolvers)
  .then(result => console.log(result))
  .catch(error => console.log(error));


const fakeDynamicQuery = x => 
  graphql(schema, q(x || process.env.Q), resolvers)
    .then(result => console.log(result))
    .catch(error => console.log(error));
