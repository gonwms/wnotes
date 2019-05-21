# es6

## This
```javascript
//#1
foo(); //-> Simple función. "this" == global objet (window)

//#2
miObjeto.foo();//-> Función en el contexto de un objeto. "this" == miObjeto

//#3
new foo();//-> New, "this" == nuevo objeto creado por la función

//#4
foo.call(objeto)// call. "this" == lo define call 
```


## promises
```javascript
var N = [0,1,2,3]
var L = ["A","m", "n"]
var X = ["B","Y","Z"]

console.log(N)

new Promise(function(resolver, rechazar){
    setTimeout(function(){
        console.log(L);
        N = 8
        resolver()
    },500)

})      
.then(function(){
     console.log(X)
     console.log(N)    
     console.dir(String)
})

```
[ver más](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Usar_promesas)


## Fetch
```javascript

fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });


```

## URL geo targetin

```javascript

      (function loadcontentList(){

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://ipinfo.io/json',true);   //<-- esta url busca ips 
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();	
            xhr.onload = () => {
                  if (xhr.status === 200){			                  
                        contentList = JSON.parse(xhr.responseText);
                        console.log(JSON.stringify(contentList) + '  ' + window.location.pathname )
                        document.write (JSON.stringify(contentList) + ' <br><br> ' + window.location.pathname )
                        return contentList
			}
			
                  else{
                        console.error(xhr.status +': ' + 'No se pudo conectar con ipInfo.io');
                  }
            };
      })()
```



´´´javascript


//*                                                                   *
//*                  Objects and Prototypes In-depth                  *
//*                                                                   *


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//               Metodos llamar función y valor This 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /*

    //:::::::::  metodo #1 de crear objeto 

    var politico1 = {
        "nombre" : "Nestor",
        "Apellido" : "Kirchner",
        "partido" : "FPV",
    }

    //::::::::: metodo #2 función en el contexto de un objeto

    function PoliticoObjet (nombre, apellido, partido){
        var nuevoPolitco = {};
        nuevoPolitco.nombre = nombre;
        nuevoPolitco.apellido = apellido;
        nuevoPolitco.partido = partido;
        return nuevoPolitco;
    }
    var politico2 = PoliticoObjet("Cristina", "Fernandez", "FPV");



    //::::::::: metodo #3 de crear objeto 
    function PoliticoNew (nombre, apellido, partido){
        //var this = {};
        this.nombre = nombre;
        this.apellido = apellido;
        this.partido = partido;
        //return this;
    }
    var politico3 = new PoliticoNew("Guillermo", "Moreno", "LNK");  // el new ahorra los pasos comentados en la función.

    */


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                 ejercicio call (Cristina - Moreno.)
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

   
    // var vengoBancado = "vengo bancando este proyecto,";
    // var peronPeron = "Perón perón, que grande sos, mi general cuanto valés";
    
    // function Politicos (nombre, apellido, partido, marcha){
        
    //     this.nombre = nombre;
    //     this.apellido = apellido;
    //     this.partido = partido;
    //     this.marcha = marcha;
    //     this.arenga = function(){
    //         alert(this.marcha);         
    //     }
    //     this.heritaje = function(){
    //         console.table(this);
    //     }
        
    // }
    // var cristina = new Politicos ("Cristina", "Fernandez", "Unidad Ciudadana", vengoBancado);
    // var moreno = new Politicos ("Guillermo", "Moreno", "La Nestor K", peronPeron); 

    // //console.log(cristina.arenga.call(moreno)); //->  "Perón perón, que grande sos, mi general cuanto valés"

    // //agrego el objeto hijos después
   
    // var hijos = {
    //     "hijo" : "Máximo",
    //     "hija" : "Florencia",
    // }
    // cristina.hijos = hijos;


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                   Ejercicios (Prototypes)
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // function Personas (nombre,sexo){
    //     this.nombre = nombre;
    //     this.sexo   = sexo;
    // };
    
    // const perci   = new Personas("Perci","mujer");
    // const piorjor = new Personas("Piorjor","varon");
    // const gladys  = new Personas("Gladys","mujer");

    
    // //      propiedad escupir hecha en objeto 
    // //      piorjor.escupir == perci.escupir 
    // //->    false
    // perci.escupir   = { escupir : "jjjjjpffff", }
    // piorjor.escupir = { escupir : "jjjjjpffff", }


    // //      propiedad saludar hecha con prototype 
    // //      piorjor.saludar === perci.saludar
    // //-->   true 
    // Personas.prototype.saludar = function(comentario){
    //     if(comentario == undefined ){
    //         console.log(this)
    //         const arrayMujer =["Las que te adornan.", "Qué sonrisa eh, ¿te atendió tu marido esta mañana?.", "Hermoso día para verte las tetas.", "Que culo mami.", "Sabés como te doy."];
    //         const arrayVaron =["¿Cómo anda cavallero", "Usted siempre tan elegante.", "Una alegría verlo", "Usted siempre tan elegante"];
    //         const numeroRandom = function ( minimo, maximo ) {
    //             return Math.floor(Math.random()*(maximo-minimo+1)+minimo); // formula robada para hacer un random entre un mínimo y un máximo.
    //         }
            
    //         if (this.sexo == "varon"){
    //             comentario = arrayVaron[ numeroRandom( 0, arrayVaron.length-1) ]
    //         }
    //         if(this.sexo == "mujer"){
    //             comentario = arrayMujer[ numeroRandom( 0, arrayMujer.length-1) ]
    //         }
    //     }
    //     console.log("Buenos días " + this.nombre + ". " + comentario);
    // }
    

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//                  Ejercicios Heritage Objects
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


    // function Argentino(nombre){
    //     this.nonmbre = nombre;      
    // }

    // Argentino.prototype.pais = "Argentina"; //  Asigno propiedad *pais* a prototype para que hijos lo hereden.

    // var azrael = new Argentino("Azrael");
    // var nacho =  new Argentino("Ignacio");


    // function Peronista(nombre){
    //     this.nonmbre = nombre;  
    //     this.partido = "peronista";
    //     this.nadaMejor = function(otroArg){
    //         if(otroArg.partido == "peronista"){
    //             console.log("Compañero")
    //         }
    //         else{
    //            console.log("Gorila hijo de puta")
    //         }
    //     } 
    // }

    // var gon = new Peronista ("Gon");
    // var dino = new Peronista("Lino");


    // dino.__proto__.__proto__ ===  Peronista.prototype.__proto__; //-> true

    // Peronista.prototype.__proto__ = Argentino.prototype;  // Peronistas heredan Argentino.prototype
 

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//               Metodos llamar función y valor This 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /*

    //::::::::: Método #1

    foo();                      //simple función //->valor "this" == global objet (window)


    //::::::::: Método #2

    miObjeto.foo();             //función en el contexto de un objeto  //-> valor "this" == miObjeto


    //::::::::: Método #3

    new foo();                  //función new //-> valor "this" == nuevo objeto creado por la función


    //::::::::: Método #4

    foo.call(objeto)            // cap 9 video //-> valor "this" == lo define call  // foo() == foo.call() // entonces para que se usa? para enlazar una funcion de un objeto con otro.  


    */




'use strict';



//*                                                                   *
//*                 	  SCOPES & CLOSURES      			          *
//*                                                                   *


// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//          IIFE (ifi)   immediately-invoked function expression 
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	//     (function(){
	//         var a = "Expresion anónima auto ejecturable";
	//         var b = "crear scope propio para las variables no sean Global";

	//         console.log(a+"\n"+b);
	//     })();
   

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//    SCOPES | definición | local vs global | function Scope & block Scope
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	/*  

		::::SOCPES:::: 
			Se refiere a la visibilidad de variables y métodos de una parte de un código en otra parte de ese código. 
			variables globales son accesibles desde cualquier parte del código. Variables locales son acceseblies solo dentro de su scope.

		
		En JS los scopes son creados pro funciones.

			function foo(){
				//this is a function scope
			}

	
		ES6 introduce block scope.

			{
				//this is a block scope
			}



		window es el global object en los nagadores. Cada global var y global fuction que se crea es una propiedad del global object.

	*/


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//	        		 Compilación e Interpretación
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	/*

	
		::::Lenguaje Compilado::::
			Un lenguaje compilado es aquel cuyo código fuente, escrito en un lenguaje de alto nivel,
			es traducido por un compilador a un archivo ejecutable entendible para la máquina.
			Son más rápidos.
		


		::::Lenguaje interpretado::::
			las instrucciones se traducen una a una cada vez que se ejecuta el programa.
			Son 10 veces más lentons que los programas compilados.
			Facilidad para lograra independencia de platadormas  y menor tamaño de programa
		
		JavaScrip es ambos. Hay un primer paso de compilación y luego uno de interpretación.



		PASOS:

		1) 	La etapa de copilación solo examina las declaraciones de variables, funciones y scopes. 
			Los argumentos pasados en las funciones son variables dentro del scope de su función.
			La etapa de compilación ignora los valores asignados a las variables, solo le importa su declaración

				var a = [esto no importa] 
				function foo(argumento){
					var b = [esto no importa];
					[esto no importa];
				}
				
				//-> Global scope: var a, function foo
					 function foo scope: var argumento, var b	


			* Si no se usa una variable no declarada (sin el var)  dentro de una función JS la crea automaticamente, pero en el global scope. 
			la variable es ignorada en el proceso de compilación y es creada en el global durante la ejecución.

			* La variable foo del siguiente ejemplo, se compila durante la etapa de compilación, donde no importa su valor,
			durante la ejecución su valor será undefined porque es asignado luego del console.log

			console.log(foo);
			var foo = 10;
			//-> undefine.



		2)  Proceso de ejecución/interpretación.
			Toma las variables e interroga a la cadena de scopes si la encuentra para asignarles valor y ejecutar las funciones, sino encuentra una variable,
			baja un nivel hasta llegar al global scope. 

	*/


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//	         HOISTING  (se hace durante la copilación)
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	/*
		HOISTING: Las variables y funciones declaradas, son puestas arriba de todo durante el proceso de compilación, No sus valores, sino declaración

				console.log(a);																
				b++;		
				c = 10;													
				
				var a;												
				var b;
				var c;

				after hoisting queda así:

				var a;												
				var b;
				var c;

				console.log(a);																
				b++	
				c = 10;		


			Fuctions Declarations vs Function Expresions hoisting. 

				::::::Fuctions Declarations::::::

				foo();
				function foo(){
					//acción 
				}
				// foo se ejecuta antes de ser declarada, pero el hoisting la pone arriba durante la copilación así que la función se ejecuta sin problemas.
				
				::::::Fuctions Expresion::::::

				foo();
				var foo = function(){
					//accion
				}
				// la función foo se ejecuta, pero durante la compilación lo que se puso arriba fue una variable (var foo) que no tiene asignado nada. Así que no funciona.

	*/




//*                                                                   *
//*                  		   CLOSURES            			          *
//*                                                                   *
       


	/*
	Closure es una función interna a otra función. 
	
	Un closure es un tipo especial de objeto que combina dos cosas: una función, y el entorno en que se creó esa función.
	El entorno está formado por las variables locales que estaban dentro del alcance en el momento que se creó el closure. 

	*/

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//			Ejemplo Closure
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	



		// function creadorDeContadores() {
		// 	let actual = 0
		// 	const agregar = function() {
		// 		actual++;
		// 		return actual
		// 	}
		// 	return agregar
		// }

		// const contador = creadorDeContadores()

		// for (var i = 0; i <= 2; i++) {	
		// 	const c1 = contador()
		// 	console.log(c1)
		// } 


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//			Ejemplo Closure (perfecto)
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	// 	/*
	// 	//https://developer.mozilla.org/es/docs/Web/JavaScript/Closures
	// 	suma5 y suma10 son ambos closures. Comparten la misma definición de cuerpo de función, 
	// 	pero almacenan diferentes entornos.	 En el entorno suma5, x es 5. En lo que respecta a suma10, x es 10.

	// 	*/
	// 	 function creaSumador(x) {
	// 	  return function(y) {
	// 	    return x + y;
	// 	  };
	// 	}

	// 	var sumar10 = creaSumador(10);
	// 	var sumar20 = creaSumador(20);
		
	// 	console.log(sumar10(5));
	// 	console.log(sumar20(5));


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//			Ejemplo Closure  -  no me cerra
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// function bar(fn){
	// 	fn();
	// }

	// function foo(){
	// 	var a =2;
		
	// 	function baz(){
	// 		console.log(a);
	// 	}
	// 	bar(baz);
	// }


	// var fn;

	// function foo(){
	// 	var a = 2;

	// 	function baz(){
 // 			console.log(a);
 // 		}

 // 		fn = baz;
	// }
	// function bar(){
	// 	fn()
	// }

	// foo();
	// bar();

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//			Loops and Closure
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	// 
		
		//Es Igual a hacer esto: 

	// 		for (let i = 1; i <= 5; i++) {			
	// 		(function(){	
	// 			var j = i;					
	// 			setTimeout(function timer(){
	// 				console.log(j);
	// 			},i*1000)
	// 		})();	
	// 	}

		//Es Igual a hacer esto: 

		// 	for (let i = 1; i <= 5; i++) {										
		// 		setTimeout(function timer(){
		// 			console.log(i);
		// 	},i*1000)
				
		// }

	//	There’s a special behavior defined for let declarations used in the head of a for loop.
	//	This behavior says that the variable will be declared not just once for the loop, but each iteration.
	//	And, it will, helpfully, be initialized at each subsequent iteration with the value from the end of the previous iteration.


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//			 					MODULO
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	
	
	var MyModules = (function Manager() {
	    
	    var modules = {};

	    function define(name, deps, impl) {
	        for (var i=0; i<deps.length; i++) {
	            deps[i] = modules[deps[i]];
	        }
	        modules[name] = impl.apply( impl, deps );
	    }

	    function get(name) {
	        return modules[name];
	    }

	    return {
	        define: define,
	        get: get
	    };
	})();


	 
	//  y asi se usa


	MyModules.define( "bar", [], function(){
	    function hello(who) {
	        return "Let me introduce: " + who;
	    }

	    return {
	        hello: hello
	    };
	});

	MyModules.define( "foo", ["bar"], function(bar){
	    var hungry = "hippo";

	    function awesome() {
	        console.log( bar.hello( hungry ).toUpperCase() );
	    }

	    return {
	        awesome: awesome
	    };
	} );

	var bar = MyModules.get( "bar" );
	var foo = MyModules.get( "foo" );

	console.log(
	    bar.hello( "hippo" )
	); // Let me introduce: hippo

	foo.awesome(); // LET ME INTRODUCE: HIPPO

	```