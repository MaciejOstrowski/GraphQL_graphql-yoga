import uuidv4 from 'uuid/v4'

const Mutation = {
    createUser(parent, args, {db}, info) {
        const emailTaken = db.users.some((user) => user.email === args.data.email)

        if(emailTaken) throw new Error('Email Taken.')
        
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)
        return user
    },
    deleteUser(parent, args, {db}, info) {
        const userIndex = db.users.findIndex((user) => user.id === args.id)

        if(userIndex === -1) throw new Error('User Not Found')
        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter((post) => {
            const match = post.author === args.id

            if(match){
                db.comments = db.comments.filter((comment) => comment.post !== post.id)
            }
            return !match
        })
        db.comments = db.comments.filter((comment) => comment.author !== args.id)

        return deletedUsers[0]
    },
    createPost(parent, args, {db}, info) {
        const userExists = db.users.some((user) => user.id === args.data.author)

        if(!userExists) {
            throw new Error('User Not Found')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)
        return post
    },
    deletePost(parent, args, {db}, info) {
        const postIndex = db.posts.findIndex((post) => post.id === args.id)

        if(postIndex === -1) throw new Error('Post Not Found')
        const deletedPosts = db.posts.splice(postIndex, 1)
        
        db.comments = db.comments.filter((comment) => comment.post !== args.id)
     
        return deletedPosts[0]
    },
    createComment(parent, args, {db}, info) {
        const userExist = db.users.some((user) => user.id === args.data.author)
        const postExist = db.posts.some((post) => post.id === args.data.post && post.published === true)

        if(!userExist || !postExist) throw new Error('User Not Found')

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        return comment
    },
    deleteComment(parent, args, {db}, info){
        const commentIndex = db.comments.findIndex((comment) => comment.id === args.id)

        if(commentIndex === -1) throw new Error('Comment Not Found')
        const deletedComments = db.comments.splice(commentIndex, 1)
        
        return deletedComments[0]
    }
}

export { Mutation as default}