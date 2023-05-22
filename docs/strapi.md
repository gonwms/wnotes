# Plugins
## populate deep
```
$ yarn add strapi-plugin-populate-deep
```
uso
```
get http://localhost:1337/api/users/me/?populate=deep,3
```

## import/export
```
yarn add strapi-plugin-import-export-entries
```

uso export (inventar una encryption key, ejemplo: salsaña)
```
$ yarn strapi export -f MY-EXPORT
```
uso import
```
$ yarn strapi import -f MY-EXPORT.tar.gz.enc --key salsaña
```
