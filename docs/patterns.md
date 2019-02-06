## MVC
`Model view controler`

```javascript
var M = {}, V = {}, C = {};

M.data = "hello world";

V.render = function (M) { alert(M.data); }

C.handleOnload = function () { V.render(M); }

window.onload = C.handleOnLoad;

```
[articulo penguin](https://www.sitepoint.com/mvc-design-pattern-javascript/)
[todoMVC](https://github.com/tastejs/todomvc)