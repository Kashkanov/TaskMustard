const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

//schema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

//resolver
const root = {
    hello: () => {
        return 'Hello World!';
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, ()=> console.log(`Server started on port localhost:4000/graphql`));