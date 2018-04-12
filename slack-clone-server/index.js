import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'

import typeDefs from './schema'
import resolvers from './resolver'
import models from './models'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const app = express();

const graphqlEndpoint = '/graphql';


app.use(graphqlEndpoint,
    bodyParser.json(),
    graphqlExpress({ schema}));

app.use('/graphiql',
    graphiqlExpress({ endpointURL: graphqlEndpoint}));

models.sequelize.sync().then(() => {
    app.listen(8080, () => {
        console.log('running on 8080')
    });
});