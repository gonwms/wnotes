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

## import/export

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
