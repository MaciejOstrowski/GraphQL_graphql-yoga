import { GraphQLServer } from 'graphql-yoga'

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        bio: String!
        location: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Rick Grimes'
        },
        bio() {
            const Bio = 'I live in Atlanta'

            return Bio;
        },
        location() {
            return 'Atlanta'
        }
    }
}

const server = new GraphQLServer ({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('This server is up')
})
