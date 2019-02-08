## MVC
`Model view controler`

```javascript
var M = {}, V = {}, C = {};

M.data = "hello world";

V.render = function (M) { alert(M.data); }

C.handleOnload = function () { V.render(M); }

window.onload = C.handleOnLoad;

```
[todoMVC](https://github.com/tastejs/todomvc)

[mvc-design-pattern-javascript](https://www.sitepoint.com/mvc-design-pattern-javascript/)

[Build A Simple Javascript App The MVC Way](https://www.awwwards.com/build-a-simple-javascript-app-the-mvc-way.html)

[Classic Front End MVC with Vanilla Javascript](https://medium.com/@patrickackerman/classic-front-end-mvc-with-vanilla-javascript-7eee550bc702)