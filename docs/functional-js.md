## Functional Js

<div class="block">

	<h2>Map</h2>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad veritatis soluta quasi necessitatibus explicabo provident officia quisquam repellat molestiae? Temporibus!</p>

</div>

<h2>otro titulo</h2>
<!-- ------------------------------------------------------------------- -->                   
<pre><code class="javascript">

function pickAnotherPerson(evt) {
	evt.preventDefault();
	evt.stopPropagation();
	evt.stopImmediatePropagation();

	var ID = $(evt.target).attr("rel").replace(/^.*(\d+)$/,"$1");
	EVT.emit("person-selected",ID);
}
	
</code></pre>
<!-- ------------------------------------------------------------------- -->

<h2>font face</h2>
<h3>esto es un sub</h3>
<!-- ------------------------------------------------------------------- -->                   
<pre><code class="css">

@font-face {
	font-family: 'GothamRoundedBold';
	src: url('fonts/gothamrnd-bold.eot');
	src: url('fonts/gothamrnd-bold.eot') format('embedded-opentype'),
		 url('fonts/gothamrnd-bold.woff') format('woff'),
		 url('fonts/gothamrnd-bold.ttf') format('truetype'),
		 url('fonts/gothamrnd-bold.svg#GothamRoundedBold') format('svg');
}

@font-face {
	font-family: 'GothamRoundedBook';
	src: url('fonts/gothamrnd-book.eot');
	src: url('fonts/gothamrnd-book.eot') format('embedded-opentype'),
		 url('fonts/gothamrnd-book.woff') format('woff'),
		 url('fonts/gothamrnd-book.ttf') format('truetype'),
		 url('fonts/gothamrnd-book.svg#GothamRoundedBook') format('svg')
		 ;
}
@font-face {
	font-family: 'GothamRoundedMedium';
	src: url('fonts/gothamrnd-medium.eot');
	src: url('fonts/gothamrnd-medium.eot') format('embedded-opentype'),
		 url('fonts/gothamrnd-medium.woff') format('woff'),
		 url('fonts/gothamrnd-medium.ttf') format('truetype'),
		 url('fonts/gothamrnd-medium.svg#GothamRoundedMedium') format('svg');
}
@font-face {
	font-family: 'GothamRoundedLight';
	src: url('fonts/gothamrnd-light.eot');
	src: url('fonts/gothamrnd-light.eot') format('embedded-opentype'),
		 url('fonts/gothamrnd-light.woff') format('woff'),
		 url('fonts/gothamrnd-light.ttf') format('truetype'), 
		 url('fonts/gothamrnd-light.svg#GothamRoundedLight') format('svg');
}



h1,h2,h3,h4,h5,h6{
	font-family: 'GothamRoundedBook'
}

</code></pre>
<!-- ------------------------------------------------------------------- -->

<h3>esto es un otro sub</h3>

## URL geo targetin

```javascript

      (function loadcontentList(){

            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://ipinfo.io/json',true);
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
                        console.error(xhr.status +': ' + 'No se encotraron documentos');
                  }
            };
      })()
```