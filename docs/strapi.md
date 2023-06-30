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

## filter

```
//deep + sort + filter
http://localhost:1337/api/[COLLECTION]/?populate=deep,2&sort=id:desc&filters[item][id][$eq]=245




```
