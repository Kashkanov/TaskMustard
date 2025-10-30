const express = require('express');
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require('@apollo/server/express4');
const fs = require("node:fs");
const typeDefs = fs.readFileSync('./schema.graphql', {encoding:'utf-8'});
const resolvers = require('./resolvers');

async function init() {
    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 8000;

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({message: "Server is up and running!"});
    });

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/graphql`));
}

init();