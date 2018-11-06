import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Scalar Types: String, Int, Float, ID, Boolean

// Array of users
let users = [
    {
        id: "1",
        name: 'Steven',
        email: 'Kowalsky@email.com',
        age: 21
    },
    {
        id: "2",
        name: 'John',
        email: 'Snow@email.com',
    },
    {
        id: "3",
        name: 'Rick',
        email: 'Grimes@email.com',
        age: 23
    },
    {
        id: "4",
        name: 'Eugene',
        email: 'Kowalsky4@email.com',
    },
    {
        id: "5",
        name: 'Steven',
        email: 'Kowalsky5@email.com',
        age: 25
    },
]

let posts = [
    {
        id: "11",
        title: 'Lord Of The Rings',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 1,
        
    },
    {
        id: "12",
        title: 'Fast and Fury',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: "13",
        title: 'Intouchables',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 2
    },
    {
        id: "14",
        title: 'Inception',
        body: 'Tratatatatttttttttttttaaa',
        published: true,
        author: 4
    },
    {
        id: "15",
        title: 'Predator',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 3
    },
    {
        id: "16",
        title: 'The Alien',
        body: 'Tratatatatttttttttttttaaa',
        published: false,
        author: 1
    },
]

let comments = [
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

    type Mutation {
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput): Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
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
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => user.email === args.data.email)

            if(emailTaken) throw new Error('Email Taken.')
            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)
            return user
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)

            if(userIndex === -1) throw new Error('User Not Found')
            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if(match){
                    comments = comments.filter((comment) => comment.post !== post.id)
                }
                return !match
            })
            comments = comments.filter((comment) => comment.author !== args.id)

            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            const userExists = users.some((user) => user.id === args.data.author)

            if(!userExists) {
                throw new Error('User Not Found')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex((post) => post.id === args.id)

            if(postIndex === -1) throw new Error('Post Not Found')
            const deletedPosts = posts.splice(postIndex, 1)
            
            comments = comments.filter((comment) => comment.post !== args.id)
         
            return deletedPosts[0]
        },
        createComment(parent, args, ctx, info) {
            const userExist = users.some((user) => user.id === args.data.author)
            const postExist = posts.some((post) => post.id === args.data.post && post.published === true)

            if(!userExist || !postExist) throw new Error('User Not Found')

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        },
        deleteComment(parent, args, ctx, info){
            const commentIndex = comments.findIndex((comment) => comment.id === args.id)

            if(commentIndex === -1) throw new Error('Comment Not Found')
            const deletedComments = comments.splice(commentIndex, 1)
            
            return deletedComments[0]
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