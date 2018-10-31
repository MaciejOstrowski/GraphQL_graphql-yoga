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
        product: Product!
        user: User!
        post: Post!
    }

    type Product {
        title: String!
        price: Float!
        releaseYear: Int!
        rating: Float!
        inStock: Boolean!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
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
        product() {
            return {
                title: 'Lord of The Rings',
                price: 4.77,
                releaseYear: 345,
                rating: 4.33,
                inStock: true
            }
        },
        user() {
            return {
                id: '12345',
                name: 'Adam',
                email: 'adam@example.com',
                age: 28
            }
        },
        post(){
            return {
                id: 54321,
                title: 'Random Post',
                body: '',
                published: false
            }
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