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
        published: true
    },
    {
        id: 2,
        title: 'Fast and Fury',
        body: 'Tratatatatttttttttttttaaa',
        published: true
    },
    {
        id: 3,
        title: 'Intouchables',
        body: 'Tratatatatttttttttttttaaa',
        published: true
    },
    {
        id: 4,
        title: 'Inception',
        body: 'Tratatatatttttttttttttaaa',
        published: true
    },
    {
        id: 5,
        title: 'Predator',
        body: 'Tratatatatttttttttttttaaa',
        published: false
    },
    {
        id: 6,
        title: 'The Alien',
        body: 'Tratatatatttttttttttttaaa',
        published: false
    },
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        product: Product!
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        greeting(name: String, position: String!): String!
        add(number1: Float!, number2: Float!): Float!
        substract(number1: Float!, number2: Float!): Float!
        grades(grades: Int!): [Int!]!
        addGrades(grades: [Int!]!): Int!
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
        product() {
            return {
                title: 'Lord of The Rings',
                price: 4.77,
                releaseYear: 345,
                rating: 4.33,
                inStock: true
            }
        },
        users(parent, args, ctx) {
            if(!args.query){
                return users
            } 
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            
        },
        posts(parent, args){
            if(!args.query){
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        greeting(parent, args, ctx, info) {
            if(args.name && args.position){
                return `Hello ${args.name}! You are my favourite ${args.position}`
            } else {
                return `Hello!`
            }
        },
        add(parent, args){
            if(args.number1 && args.number2){
                return args.number1 + args.number2
            } else {
                return 'Provide all arguments'
            }
        },
        substract(parent, args){
            if(args.number1 && args.number2){
                return args.number1 - args.number2
            } else {
                return 'Provide all arguments'
            }
        },
        grades(parent, args){
            const grades = []
            for(var i=0; i<= args.grades; i++){
                grades.push(i);
            }
            return grades
        },
        addGrades(parent, args){
            if(args.grades.length === 0){
                return 0
            }
            else {
                return args.grades.reduce((previousValue, currentValue)=>{
                    return previousValue + currentValue
                })
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