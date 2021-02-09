# INICIO DE PROYECTO

## PASOS GENERALES.

SERVER

1. Creación de Base de datos en Mongo
2. Crear carpeta **server** e iniciar proyecto.
3. Crear _index.js_ en donde se crea el servidor **Apollo-Server** y conecta a **Mongoose**
4. Crear una carpeta **models** con un archivo por cada Schema ej: User.js, Post.js
5. Crear una carpeta **GraphQL** con typeDefs y resolver
6. Agregar Token

CLIENT

7. Setup **ApolloProvider**
8. Router
9. useQuery
10. useMutation

## step01 - Base de datos

_Mongodb.com_

- crear proyecto
- crear cluster
- Database Access > add database USER > generar y guardar contraseña.
- Network Access > add IP ADDRESS > Acceess Anywhere (solo en desarrollo)
- Cluster > connect > Connect your application > copy string y hacer un config.js con el string.

## step02 - Crear proyecto

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

## step03 - Setup index

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

## step04 - Mongoose Models

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

## step05 - GraphQL

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
      // id se pasa como objeto
      try {
        const user = await User.findById(userId);
        if (user) {
          console.log(user);
          return user;
        } else {
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

### Merging Resolvers

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

## step06 - Agregar token

1. agregar en register.
2. agregar al cache de navegaror

## step07 - Apollo Provider

1. $yarn add @apollo/client
1. crear const Client y setear servidor y cache
1. Envolver App en **ApolloProvider** y pasar client como prop
1. doc https://www.apollographql.com/docs/react/get-started/

en index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:5000', //ruta al puerto en donde estamos ejecutando el server
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Se puede agregar un test rápido al index para consolear resultados

```javascript
client
  .query({
    query: gql`
      query {
        getUsers {
          id
          username
        }
      }
    `,
  })
  .then((result) => {
    console.log(result);
  });
```

## step08 - Router

1. Instalar react-router-dom
2. En index.js envolver la app en **Router**
3. En App.js armar **Switch** de **Route** según path
4. hacer los botones. Cualquier btn se tiene que envolver en un **Link**

en index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      // App dentro de Router
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

App.js

```javascript
// imports
import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import About from './components/About';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

// definimos el current por defecto segun url path
const pathname = window.location.pathname;
const currentPath = pathname === '/' ? 'home' : pathname.substr(1);

function App() {
  const [current, setCurrent] = useState(currentPath);

  function handleClick(e) {
    setCurrent(e.target.name);
  }

  return (
    <div className="App">
      <div className="menu">
        <Link
          onClick={handleClick}
          name={'home'}
          className={current === 'home' && 'active'}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={handleClick}
          name={'about'}
          className={current === 'about' && 'active'}
          to="/about"
        >
          About
        </Link>
        <Link
          onClick={handleClick}
          name={'login'}
          className={current === 'login' && 'active'}
          to="/login"
        >
          Login
        </Link>
        <Link
          onClick={handleClick}
          name={'register'}
          className={current === 'register' && 'active'}
          to="/register"
        >
          Register
        </Link>
      </div>
      <div className="content">
        <Switch>
          <Route path="/about">
            {' '}
            <About />{' '}
          </Route>
          <Route path="/register">
            {' '}
            <Register />{' '}
          </Route>
          <Route path="/login">
            {' '}
            <Login />{' '}
          </Route>
          <Route exact path="/">
            {' '}
            <Home />{' '}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
```

## step09 - useQuery

1. Se importa useQuery y gql
1. Se define una const con el schema
1. se utiliza la función **useQuery** dentro del componente que devuelve un **loading**, **error**, **data**
1. conviene desestructurar la info que devuelve data

En cualquier componenente de la app

```javascript
import { useQuery, gql } from '@apollo/client';

const FETCH_CLIENTES = gql`
  query {
    getUsers {
      id
      username
    }
    getRestaurants {
      name
      cuisine
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(FETCH_CLIENTES);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  //desestructuro data en getUsers y le doy un alias Users
  const { getUsers: Users, getRestaurants: Restaurants } = data;

  console.log(Users);
  console.log(Restaurants);

  return (
    <div className="App">
      <h1>Hola mundillo</h1>
      {Restaurants.map((Restaurant, i) => {
        return (
          <div key={i}>
            <strong>{Restaurant.name}</strong>
            <br />
            {Restaurant.cuisine}
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default App;
```

## step10 - useMutation

```javascript
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './Register.css';

const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
      email
      username
      createdAt
    }
  }
`;

function Register() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [
    addUser,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: formValues,
  });

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    console.log(formValues);
    addUser();
  }

  return (
    <div className="card">
      <h1>Register</h1>
      <form onSubmit={handleSubmitClick}>
        <input
          type="text"
          id="username"
          placeholder="Your Name"
          onChange={handleChange}
        />

        <input
          type="email"
          id="email"
          placeholder="Your Email"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Your Password"
          onChange={handleChange}
        />

        <input
          type="submit"
          value="Registrar" /*onClick={handleSubmitClick} */
        />
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
}

export default Register;
```
