# Vue Js

## Install

### create new proyect

`vue create [proyect name]`

### add vuetify 
`vue add vuetify`

## Template
### Directives
#### v-bind
```javascript
<a v-bind:href= item.url ><img v-bind:src= myMethods()></a>
```

#### v-model
create two-way data bindings on form input, textarea, and select elements

```javascript
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### v-for
```javascript
<h1 v-for="user in users" :key="user.name">{{ user.name }}</h1>
```

#### v-on
```javascript
<button v-on:click = "saludar" >saludar</button>
```

```javascript
methods: {
	saludar() {
		console.log(this.saludo)
	},
}
```
#### v-if
```javascript
<a class="user" v-if="user != null">
	<img v-bind:src="this.user.photoURL" alt /><span>{{this.user.displayName}}</span>
</a>
```

### componenet script

#### estructura base
```javascript
import { mapActions, mapGetters } from 'vuex'
export default {
	name: "home",
	components:{ widgte, sidebar,},
	data(){
		return {
			users: 'gon,
		}
	},
	methods:{
		log(){
			console.log(this.user)
		}
	}
}
```

#### data
```javascript
data(){
	return {
		users: this.$store.getters.getUser,
		
	};
},
```
#### Computed
A computed property will only re-evaluate when some of its reactive dependencies have changed
```javascript

En los componentes siempre debería usar $dispatch
computed: {
	//forma clásica
	list(){ 
		return this.$store.getters.getList
	},
	//forma con mapGetters (se deben importar los Getters)
	...mapGetters({
		user: 'getUser'
	}),
	// forma con get y set (deben ser una función o tener un return)
	myProperty: {
		get() {
			return this.$state.getters.my_property;
		},
		set( value ) {
			//Dispatch triggers an action whereas commit triggers a mutation
			this.$state.dispatch('setMyProperty', value);
		}
	},

},
```
#### watchers
//Watch observa si un dato cambia y ejecuta una acción. El nombre del watch es igual al dato observado. Si el dato es una entrada de un objeto, el nombre del watcher lleva '' comillas

```javascript
data(){
	return {
			users:{
				name:'gon'
			}
		}
	};
},
watch: {
	'user.name'(){
		this.$store.dispatch("someActionIn$store",this.users.name);
	}
},
```
#### methods

```javascript
methods: {
	// forma común
	currentUserActive() {
		//Do someFn
		this.$store.dispatch('increment');
	}
	// forma mapActions
	...mapActions([
	'increment',
	'decrement',
	]),
},		
```
#### dispatch vs Commit

**dispatch** triggers an action.  
**$Commit** triggers a mutation.  
En los componentes siempre debería usar dispatch.

```javascript
this.$state.dispatch('setMyProperty', value);
```

### lifecycle 

```javascript
beforeCreate(){
},
created() {
//Ready data , computed properties, methods, watchers and event callbacks 
},
beforeMount(){
},
mounted(){
// DOM component ready
this.$nextTick(() => {
	//DOM Ready for de all the childs componenets
})	
},
beforeUpdate() {
// called anytime changes are made to our data and the DOM needs to be updated, right before the DOM is patched
},
update() {
//  hook is fired after a change has been made.
//If you want to wait until the entire view has been re-rendered, you can use vm.$nextTick inside of updated:
},
beforeDestroy() {
//all directives of the Vue instance have been unbound, all event listeners have been removed, and all child Vue instances have also been destroyed.
// this.$store.dispatch("unsubscribe");
},

```

## Vuex Store

### Estructura Base
Vuex getters is to Vue computed as Vuex state is to Vue data.
*Dispatch* triggers an action 
*Commit* triggers a mutation

```javascript
import 'firebase/firestore';
import firebase from 'firebase/app';
import {db} from "@/main";

export default{	
	state:{
	},
	getters: {
	},
	mutations: {
	},
	actions: {
	}
}

```

### State
```javascript
	state:{
		users:[],
		count:1,
	},
```
### Getters
Vuex getters is to Vue computed as Vuex state is to Vue data.
```javascript
	getters: {
		getUsers(state) {
			return state.users;
		},
	},
```
### Mutations
//Mutations are synchronous
*Commit* triggers a mutation
```javascript
	mutations: {
		increment (state, payload) {
			state.count + paylaod
		}
	},
```
### Actions
//actions are Asynchronous
*Dispatch* triggers an action 

```javascript
	actions: {
		//Dispatch triggers an action whereas commit triggers a mutation
		increment (context, payload) {
			context.commit('increment', payload)
		},
		//ejecutar una acción adentro de otra acción, debo incluir un objeto con dispatch como parámetro de la acción
		logThenIncrement ({ dispatch } ,payload) {
			console.log('una función tonta antes de otra acción')
			dispatch("increment",payload);
		},
	}
```
### Action inside action
Si la accion tiene el parametro context, usar el context.dispatch
```javascript
getFireStoreAgenda(context, day) {	
	context.dispatch("increment",payload);
}  


```
Si la acción no tiene context, incluir un objeto con dispatch como parámetro de la acción
```javascript
	actions: {
		logThenIncrement ({ dispatch } ,payload) {
			dispatch("increment",payload);
		},

	}
```