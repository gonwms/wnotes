# INICIO DE PROYECTO

## PASOS GENERALES.

1. Creación de Base de datos en Mongo
2. Crear carpeta **server** e iniciar proyecto.
3. Crear *index.js*en donde se define el servidor **(apolloServer)**
4. Crear una carpeta **models** con un archivo por cada Schema ej: User.js, Post.js
5. Crear una carpeta GraphQL con typeDefs y resolver
6. Agregar Token

## Paso 01 Base de datos

_Mongodb.com_

- crear proyecto
- crear cluster
- Database Access > add database USER > generar y guardar contraseña.
- Network Access > add IP ADDRESS > Acceess Anywhere (solo en desarrollo)
- Cluster > connect > Connect your application > copy string y hacer un config.js con el string.

## Paso 02 Crear proyecto

1. $yarb init o $npm init
2. crear index.js
3. crear .gitignore
4. instalar _apollo graphql graphql-tag mongoose_ `$ yarn add apollo-server graphql mongoose nodemon`
5. agregar SCRIPTS a package.json para ejecutar el servidor.

package.json

```javascript
  "scripts": {
    "serve": "node index",
    "start": "nodemon index"
  },
```

## Paso 03 Setup index

index.js

```javascript
const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/');
const { MONGODB } = require('./config.js');

//process.env.PORT || 5000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
const PORT = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
```

## Paso 04 Mongoose Models

Es una biblioteca para definir _Schemas_ y _Modelos_ y contectarse con MongoDB
Se crea una carpeta _"models"_ y se hace un .js para cada entidad?

models/Users.js

```javascript
const { model, Schema } = require('mongoose');

const usersSchema = new Schema({
  username: String,
  password: String,
  createdAt: String,
  alias: String,
  email: String,
});
// el último parametro es opcional, es el nombre de la collección ej: 'users'. Si no está usa por defecto el primero en lowercase y plural en en este caso también sería 'users'
module.exports = model('User', usersSchema, 'users');
```

## Paso 05 GraphQL

typeDefs y resolver

1. Crear carpeta graphql
1. crear typeDefs.js
1. crear carpeta resolvers y un archivo para cada entidad más un index.js para agruparlos a todos: ej: posts.js, users.js

### typeDefs

ej: graphql/typeDefs.js

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

### Resolvers

ej: graphql/resolvers/users.js

```javascript
const { UserInputError } = require('apollo-server');
const bcrypt = require('bcrypt');

const User = require('../../model/Users.js');

module.exports = {
  Query: {
    async getUser(_, { userId }) {
      console.log('HOLA');
      try {
        const user = await User.findById(userId);
        if (user) {
          console.log(user);
          return user;
        } else {
          console.log('NO');
          throw new Error('not user found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUsers() {
      try {
        const user = await User.find();
        if (user) {
          return user;
        } else {
          throw new Error('not user found');
        }
      } catch (error) {
        throw new Error('not user found', error);
      }
    },
  },
  Mutation: {
    async register(_, { username, password, email, alias }) {
      //TODO: chequear que el USER no esté siendo usado
      //TODO: chequear que el EMAIL no esté siendo usado
      //TODO: agregar TOKEN

      // encripta hash password
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        alias: alias,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      console.log(res._doc);
      return {
        ...res._doc,
        id: res._id,
      };
    },

    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        throw new UserInputError('El usurio no existe');
      }

      // compara password encriptado durante el registro
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UserInputError('El password no coincide');
      }
      return {
        ...user._doc,
        id: user._id,
      };
    },
  },
};
```

### Mergin Resolvers

ej: resolvers/index.js

```javascript
const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const restaurantsResolvers = require('./restaurants');

module.exports = {
  Query: {
    ...postsResolvers.Query,
    ...usersResolvers.Query,
    ...restaurantsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
```
