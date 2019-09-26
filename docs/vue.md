# Vue Js

## Install

### create new proyect

`vue create [proyect name]`


## Vuex

### Store module

```javascript
import Vue from 'vue'; import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({	

    state: {
        count: 2
    },
    mutations: {
        
    },
    getters: {
        
    },
    actions: {
        
    }
});

```

### Componentexplorer
```javascript
export default {
	name: "home",
	components:{
		widgte, sidebar,
	},
	data(){
		return{
			myData:2,
			otherData:"hello"
		}
	},
	computed: {
		myProperty: {
			get() {
				return this.$state.getters.my_property;
			},
			set( value ) {
				this.$state.dispatch('setMyProperty', value);
			}
		}
	},
	methods: {
		...mapActions([
		'increment', 'decrement', 'reset',
		]),
	},		
}

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