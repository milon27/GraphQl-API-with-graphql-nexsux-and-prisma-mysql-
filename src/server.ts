import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { MySchema } from './gql/MySchema'

const app = express()

async function run() {

    const prisma = new PrismaClient()


    // const schemaWithMiddleware = applyMiddleware(makeExecutableSchema({
    //     resolvers: Resolvers,
    //     typeDefs: TypeDefs
    // }), Permissions);

    const server = new ApolloServer({
        context: ({ req, res }) => {
            return { prisma, req, res }
        },
        schema: MySchema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        debug: false
    })

    await server.start()
    server.applyMiddleware({ app })

    app.get('/', (req, res) => {
        res.send("app running...")
    })
    app.listen(2727, () => console.log('running on 2727'))
}
run()