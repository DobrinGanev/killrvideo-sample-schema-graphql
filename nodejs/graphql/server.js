require('dotenv').config()
const {ApolloServer} = require('apollo-server-express')
const express = require('express')
const {resolvers} = require('./resolvers')
const {createServer} = require('http')
const {typeDefs} = require('./typeDefs')
const cassandra = require('../cassandra/client')

const app = express()
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {client: cassandra.createClient('killrvideo')}
  },
})
server.applyMiddleware({app, path: '/graphql'})

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)
const PORT = 4000

httpServer.listen({port: PORT}, () => {
  console.log(`Apollo Server listens on http://localhost:${PORT}/graphql`)
})
