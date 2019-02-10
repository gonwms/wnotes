## Functional Js




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