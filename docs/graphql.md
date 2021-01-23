
# MongoDB

## Creación de Base de datos en *Mongodb.com*

* crear proyecto
* crear cluster
* Database Access > add database USER > generar y guardar contraseña.
* Network Access > add IP ADDRESS > Acceess Anywhere (solo en desarrollo)
* Cluster > connect > Connect your application > copy string


## Crear proyecto

1. $npm init 
2. crear index.js
3. crear .gitignore
4. instalar  *apollo graphql mongoose*  `$ npm install apollo-server graphql mongoose`

En index.js
```javascript
// ejemplo super simple
const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag');

const typeDefs = gql`
	type Query {
		sayHi: String!
	}
`
const resolvers = {
	Query: {
		sayHi: () => 'Hello World'
	}
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen({ port: 5000 })
	.then(res => { 
		console.log(`Server running at ${res.url}`);
	})

```

## BACKEND MERNG


### 01 Apollo server 
Apollo es un servidor que compila GraphQL. 
```javascript

const { ApolloServer } = require('apollo-server')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 5000 })
	.then(res => { 
		console.log(`Server running at ${res.url}`);
	})
```
### Mongoose

Es una biblioteca para definir *Schemas* y *Modelos* y contectarse con MongoDB
Se crea una carpeta *"models"* y se hace un .js para cada entidad?

Ejemplo 
```javascript
const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema)
```
Al servidor de apollo primero lo contectamos con mongoDB
```javascript
mongoose.connect(MONGODB, { useNewUrlParser: true }).then(() => {
  console.log('Se conecto');
  return server.listen({ port: 5000 })
})
```




### GraphQL

1. *typeDefs* (Type definitions )
2. *resolvers* tiene querys y mutations


1 ejemplo de typeDefs
```javascript
const { gql } = require('apollo-server');

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(RegisterInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;

```

Ejemplo de resolver
```javascript
const { AuthenticationError } = require('apollo-server');

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getPost(_, { postId }) {
            const post = await Post.findById(postId);
            if (post) {
                return post;
            } else {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context);

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            const post = await newPost.save();

            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
};

```