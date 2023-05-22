# Plugins
## populate deep
*install*
```
$ yarn add strapi-plugin-populate-deep
```

uso
```
get http://localhost:1337/api/users/me/?populate=deep,3
```

## import/export

*Install*
```
yarn add strapi-plugin-import-export-entries
```

*Export* 

(inventar una encryption key, ejemplo: salsaña)
```
$ yarn strapi export -f MY-EXPORT
```
*Import*
```
$ yarn strapi import -f MY-EXPORT.tar.gz.enc --key salsaña
```
