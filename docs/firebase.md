## Instalación

1. en https://console.firebase.google.com - crear project.

2. $ `npm install firebase-tools -g` (solo la primera vez, ya lo tengo instalado creo)
3. $ `firebase init hosting` - crea la estructura inicial de archivos
4. $ `firebase serve` - crea localhost en puerto 5000  - ctrl + c para terminar ejecución
5. $ `firebase deploy` - sube la app a internet 

6. borrar todo lo de index.html menos los imports del <head>
7. crear un app.js al final del index

## custom domain

1. Hacer verificación TXT y esperar.
2. Agregar DNS. `Siempre dejar los el Campo de nombre vacio.` Si no anda probar con:  TTL 14400

## autenticación 

1. authentication: elegir métodos.



## links 
[github.com/firebase](https://github.com/firebase)
[chat hecho en firebase](https://github.com/othreecodes/friendlychat)




## firestore

### add

Crear colección es igual que agregar data.  Si la coleción no existe se crea sola.

```javascript
firebase.firestore().collection('lolo').add({
	first: "lolo",
	last: "lolololo",
	born: 1815
 })
 .then(function(docRef) {
	console.log("Document written with ID: ", docRef.id);
 })
 .catch(function(error) {
	console.error("Error adding document: ", error);
 });

```


### set

set(), update() 

set() replacing all the child properties at the current location
update() can be use to selectively update only the referenced properties at the current location


```javascript

	var doc = db.collection('dataModel').doc(clickedItemId);
	doc.get()
		.then((object) => {
				doc.update({
						'priority':true
				})
		})

```

### get 

```javascript

 firebase.firestore().collection('dataModel').get()
 
 .then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
	    console.log(`${doc.id} => ${doc.data()}`);
	})
 });


```

### delete

```javascript

	doc.delete()

```

### onSnapshot

```javascript

 db.collection('dataModel')

	.where("soft_deleted", "==", false)
	.where("account_ref_string", "==", "accounts/" + this.account_id)
	.orderBy('date', "desc")

	.onSnapshot((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			console.log(doc);
			
			dataView.createAndInsertNew(doc)
		});
	});

```