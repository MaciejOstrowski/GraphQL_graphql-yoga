# GraphQL_graphql-yoga
Configured GraphQL environment with Graphlql-yoga interface to training queries.


You can training GraphQL queries on localhost and other stuff. 
I used this Udemy E-learning  [GraphQL-Bootcamp](https://www.udemy.com/graphql-bootcamp/) code, to learn GraphQL.

---------------------------------------------------------------------
## Table of contents
1. [ TO START ](#TO_START)
2. [ Example Queries/Mutations ](#Example_queries/mutations)
	1. [ Query ](#Query)
		1. [ Display Users ](#display_users)
		2. [ Display Posts ](#display_posts)
	2. [ Mutations ](#Mutation)
		1. [ Create User ](#create_user)
		2. [ Create Post ](#create_post)
		1. [ Create Comment ](#create_comment)
		2. [ Delete User ](#delete_user)
		1. [ Delete User ](#delete_post)
		2. [ Delete Post ](#delete_comment)
---------------------------------------------------------------------


## TO START:  <a name="TO_START"></a>

```
1. git clone https://github.com/MaciejOstrowski/GraphQL_graphql-yoga.git

2. git checkout develop

3. npm install

4. npm run start

5. At your browser run http://localhost:4000/
```

If you have any problem with configuration - take a look at this Udemy-course: [GraphQL-Bootcamp](https://www.udemy.com/graphql-bootcamp/)


## Example queries/mutations: <a name="Example_queries/mutations"></a>

###### Query <a name="Query"></a>
>Display array of users and their posts/comments <a name="display_users"></a>
```graphql
query{
  users{
  	id
    name
    email
    age
    posts{
      id
      title
      body
      comments{
        id
        text
        author{
          name
        }
      }
    }
  }
}
```
>Display array of all posts in data <a name="display_posts"></a>
```graphql
query{
  posts{
    id
    title
  }
}
```
###### Mutation <a name="Mutation"></a>

>Create User Mutation <a name="create_user"></a>
```graphql
mutation {
  createUser(data: {          #Provide data you want sent
    name: "John"
    email: "John@email.com"
    age: 32
  }){                         #Data you want to display after sent the request
    id                      
    name
    email
    age
  }
}
```

>Create Post Mutation <a name="create_post"></a>
```graphql
mutation{
  createPost(
    data: {
      title: "Lord Of The Rings"
      body: "Lord Of The Rings Lord Of The Rings Lord Of The Rings"
      published: true
      author: "0aa93dd8-ca98-4403-8429-86de96f59fc3"
  }){
    id
    title
    body
    published
    author{
      name
      id
    }
  }
}
```

>Create Comment Mutation <a name="create_comment"></a>
```graphql
mutation {
  createComment(data: {
    text: "Lord Of The Rings"
    author: "2"
    post: "25a085ba-2a4e-4c4f-aac5-7ca9affa9a19"
  }){
    id
    text
    author{
      id
      name
    }
  }
}
```

>Delete User Mutation <a name="delete_user"></a>
```graphql
mutation{
  deleteUser(id: 1){
    id
    name
    email
    age
  }
}
```

>Delete Post Mutation <a name="delete_post"></a>
```graphql
mutation {
	deletePost(id: "25a085ba-2a4e-4c4f-aac5-7ca9affa9a19"){   #Provide correct post.id you want to delete
    id
    title
    body
    author{
      name
    }
  }
}
```

>Delete Comment Mutation <a name="delete_comment"></a>
```graphql
mutation {
   deleteComment(id: "20532a81-7f16-4a3e-af4a-76045b8bd268"){    #Provide correct comment.id you want to delete
    id
    text
    author{
      name
    }
  }
}
```

----------------------------------------------------------------------------------------------------------------------------------

<b>Who can maintains and contributes to the project?</b>  Everyone :)
