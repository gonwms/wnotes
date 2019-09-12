"use strict";

// CONFIGURACIÓN
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var config = {
	cliente:"Gato Dumas",
	tieneEtiquetas:true,
	mes:"Agosto 2019",  
	fecha:"2019-08-16", // YYYY-MM-DD elegir la fecha de data.
	posicionMaxima: 50, // Mostrar palabras hasta el puesto... 
	peorEvolucion: -2,  // Máximo valor negativo de caida
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



document.addEventListener('DOMContentLoaded',() =>{
	//Completar data
	var cliente = document.querySelector('.cliente');
	var periodo = document.querySelector('.periodo');
	var copa = document.querySelector('.copa');
	copa.innerHTML = config.cliente[0];
	cliente.innerHTML = config.cliente;
	periodo.innerHTML = config.mes;
		
	
	//importan datos tabla
	fetch('data.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			var datos = myJson;

			// ordenar
			datos.sort(function(a,b){
				if(a.Labels > b.Labels){
					return 1;
				}
				else if(a.Labels < b.Labels){
					return -1;
				}
				else if(a.Labels == b.Labels){
					if(a["Google es-AR Rank"] >= b["Google es-AR Rank"]){
						return 1;
					}
					if(a["Google es-AR Rank"] < b["Google es-AR Rank"]){
						return -1;
					}
				}
			});


			//Tabla headers
			var tabla = document.querySelector('#tabla');
			tabla.innerHTML = `
				<tr class="head">
				<th class="col palabra">Palabra Clave</th>
				<th class="col label">Etiqueta</th>
				<th class="col rank">Puesto</th>
				<th class="col change"></th>
				<th class="col url">URL</th>
				</tr>
			`
			datos.forEach((obj) => {
				//format labels
				var labels ="";
				var etiquetas = obj.Labels.split(",")
				etiquetas.forEach(item =>{
					labels += `<span>${item}</span>`
				})

				//filtros rows
				if(
					obj["Google es-AR SERP Date"] == config.fecha 
					&& obj["Google es-AR Rank"] <= config.posicionMaxima && obj["Google es-AR Rank"] != ""
					&& obj["Google es-AR Change (vs previous date)"] >= config.peorEvolucion
				){

					//render rows
					var row = document.createElement('TR'); 
					row.classList.add('row');
					row.innerHTML = `
					<td class="col palabra">${obj.Keyword}</td>
					<td class="col label">${labels}</td>
					<td class="col rank">${obj["Google es-AR Rank"]}</td>
					<td class="col change"><span>${obj["Google es-AR Change (vs previous date)"]}</span></td>
					<td class="col url"><a href="${obj["Google Mobile es-AR URL"]}" target="_blank">${obj["Google Mobile es-AR URL"]}</a></td>
					`;
					if(
						obj["Google es-AR Change (vs previous date)"] > 0 ){
						row.classList.add('up');
					}
					else if(
						obj["Google es-AR Change (vs previous date)"] == 0 ){
						row.classList.add('hide');
					}
					tabla.appendChild(row);
				}

			});
			var label = Array.from(document.querySelectorAll('.label'))
			label.forEach((item) =>{
				if (config.tieneEtiquetas == false){
					item.classList.add('nolabel')	
				}
			})

			
		});


		
});	