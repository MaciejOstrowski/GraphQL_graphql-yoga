import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar Types: String, Int, Float, ID, Boolean

// Array of users
const users = [
    {
        id: 1,
        name: 'Steven',
        email: 'Kowalsky@email.com',
        age: 21
    },
    {
        id: 2,
        name: 'John',
        email: 'Snow@email.com',
    },
    {
        id: 3,
        name: 'Rick',
        email: 'Grimes@email.com',
        age: 23
    },
    {
        id: 4,
        name: 'Eugene',
        email: 'Kowalsky4@email.com',
    },
    {
        id: 5,
        name: 'Steven',
        email: 'Kowalsky5@email.com',
        age: 25
    },
]

const posts = [
    {
        id: 1,
        title: 'Lord Of The Rings',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 1
    },
    {
        id: 2,
        title: 'Fast and Fury',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: 3,
        title: 'Intouchables',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: 4,
        title: 'Inception',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 4
    },
    {
        id: 5,
        title: 'Predator',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 3
    },
    {
        id: 6,
        title: 'The Alien',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 1
    },
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`


// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx) {
            if(!args.query){
                return users
            } 
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            
        },
        //one, two, three
        posts(parent, args){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find( (user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, arg, ctx, info) {
            return posts.filter( (post) => {
                return post.author === parent.id
            })
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