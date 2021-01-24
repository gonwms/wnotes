#RegExp
## expresiones
### comienza con
```
^a // 
```

### a OR b OR c
```
(a|b|c)
```

### cualquier caracter
```
. 
```

###  Matches between zero and unlimited
```
*
```

## match()


```javascript
  var str = "The quick brown fox jumped over the box like an ox with a sox in its mouth";

  str.match(/\w(ox)/g); // ["fox", "box", "sox"]

  // match (when used with a 'g' flag) returns an Array with all matches found
  // if you don't use the 'g' flag then it acts the same as the 'exec' method.

  str.match(/\w(ox)/); // ["fox", "ox"]
  /\w(ox)/.exec(str);  // ["fox", "ox"]


```

## exec()
the exec method returns an Array where:
1. The first index is the match  
2. and all other indexes are capturing groups

note: adding a 'g' flag has no effect on the returned Array

```javascript
  /\w(ox)/g.exec(str);  // ["fox", "ox"]

```

// You can use a `while` loop with the exec method to find successive matches

```javascript
  var TitleMDRegEx  = /^(#+\s)(.+)/gm 
  // arr[0]: match ## titulo  
  // arr[1]: ^(#+\s) Comienza con x cantidad de # + espacio
  // arr[2]: (.+) Captura todo el titulo.
  
  //## titulo 

  var str = content.innerHTML
  var titlesArr; var codeArr; var listArr; var textArr
  while((titlesArr = TitleMDRegEx.exec(str)) !== null){

      content.innerHTML = content.innerHTML.replace(titlesArr[0],`<h${titlesArr[1].length-1}>${titlesArr[2]}</h${titlesArr[1].length-1}>`)
  }

```