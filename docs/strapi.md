# Plugins

## populate deep

_install_

```
$ yarn add strapi-plugin-populate-deep
```

uso

```
get http://localhost:1337/api/users/me/?populate=deep,3
```


## Subir a railway (postgres)

Esto aplica para postgress
1. En local, la carpeta confing crear una carpetas env\production y dentro database.ts
este archivo se lee automaticamente por strapi si existe.

```env/production/database.ts
module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("PGHOST", "127.0.0.1"),
      password: env("PGPASSWORD", "password"),
      port: env.int("PGPORT", 5931),
      database: env("PGDATABASE", "railway"),
      user: env("PGUSER", "postgres"),
      ssl: env.bool(true),
    },
  },
});

```
   
2. crear un db vacía en railway y copiar los datos variables
3. deployar el strapi desde el repo de github. una vez creado en railway, agregarle los datos de db nueva. Notar que el nombre de las variables difiere. agregar sin borrar y chequear que estén todas las necesarias
   
## import/export con Dbeaver

### backup
1. En la DB originial click derecho > tools > backup > elegir todas las tablas> next
2. Elegir formato Custom, coding UTF-8 y
3. comenzar
   
### Restore
1. En la DB que recibe la data > click derecho > tools > restore
2. Formato custom, Clean (drop) database objects before creating
3. comenzar

## Resetear password

npm run strapi admin:reset-user-password

## import/export (vieja forma)

https://blog.railway.app/p/postgre-backup
https://dbdeveloper.medium.com/easy-steps-to-backup-your-postgresql-database-in-2024-15a25a232c7f

_Install_

```
yarn add strapi-plugin-import-export-entries
```

_Export_

(inventar una encryption key, ejemplo: salsaña)

```
$ yarn strapi export -f MY-EXPORT
```

_Import_

```
$ yarn strapi import -f MY-EXPORT.tar.gz.enc --key salsaña
```


## transfer
para transferir de local a remote. Solo transfiere la data. No los usuarios
1. generear token en el panel admin del strapi remoto
2. en el CLI local:

```
yarn strapi transfer --to https://lio-server-production.up.railway.app/admin --to-token [TOKEN]
```
   

## filter

deep + sort

```
http://localhost:1337/api/[COLLECTION]/?populate=deep,2&sort=id:desc
```

filter

```
http://localhost:1337/api/[COLLECTION]/?populate=deep,2&s&filters[item][id][$eq]=245
```
