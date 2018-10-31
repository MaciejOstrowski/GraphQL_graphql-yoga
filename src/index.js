import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar Types: String, Int, Float, ID, Boolean

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        average: Float!
        location: String!
        bio: String!
        title: String!
        price: Float!
        releaseYear: Int!
        rating: Float!
        inStock: Boolean!
    }
`


// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Andrew'
        },
        age() {
            return 27
        },
        employed() {
            return true
        },
        average() {
            return 3.87
        },
        location() {
            return 'Atlanta'
        },
        bio() {
            return 'I live in Atlanta';
        },
        title() {
            return 'My Title'
        },
        price() {
            return 4.98
        },
        releaseYear() {
            return 598
        },
        rating() {
            return 4.02
        },
        inStock() {
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => {
    console.log('This server is up')
})