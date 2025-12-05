const express = require('express');
const {ApolloServer} = require("@apollo/server");
const {expressMiddleware} = require('@apollo/server/express4');
const fs = require("node:fs");
const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const resolvers = require('./resolvers');

async function init() {
    const app = express();
    app.use(express.json());
    const PORT = process.env.PORT || 8000;

    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });

    app.use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        res.header("Access-Control-Allow-Credentials", "true");

        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }

        next();
    })

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await gqlServer.start();

    app.get("/", (req, res) => {
        res.json({message: "Server is up and running!"});
    });

    app.use('/graphql', expressMiddleware(gqlServer));


    // app.use("/tasks", taskServices);

    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}/graphql`));
}

init();