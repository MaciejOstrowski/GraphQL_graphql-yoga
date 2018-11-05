import { GraphQLServer } from 'graphql-yoga'

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
        id: 11,
        title: 'Lord Of The Rings',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 1,
        
    },
    {
        id: 12,
        title: 'Fast and Fury',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: 13,
        title: 'Intouchables',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: 14,
        title: 'Inception',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 4
    },
    {
        id: 15,
        title: 'Predator',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 3
    },
    {
        id: 16,
        title: 'The Alien',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 1
    },
]

const comments = [
    {
        id: 101,
        text: 'Duis ultricies luctus orci, non tincidunt lacus posuere sit amet.',
        author: 1,
        post: 12
    },
    {
        id: 102,
        text: 'Pellentesque at neque urna. Nunc interdum pulvinar odio, ut fermentum.',
        author: 2,
        post: 13
    },
    {
        id: 103,
        text: 'Vestibulum bibendum auctor turpis, ac faucibus metus consectetur non. Vestibulum.',
        author: 3,
        post: 14
    },
    {
        id: 104,
        text: 'Donec imperdiet sagittis purus sit amet luctus. Fusce molestie est.',
        author: 4,
        post: 15
    },

]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        posts(parent, args) {
            if(!args.query) {
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        comments(parent, args) {
            if(!args.query) {
                return comments
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, arg, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, arg, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info){
            return posts.find((post) => {
                return post.id === parent.post
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