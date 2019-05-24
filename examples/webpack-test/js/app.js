document.addEventListener('DOMContentLoaded', ()=>{
	var body = document.body;
	var title = document.createElement('H1');
	title.classList.add('titulo');
	title.innerText = 'Webpack';
	body.insertAdjacentElement('afterbegin', title);
	console.log(body);
	
});