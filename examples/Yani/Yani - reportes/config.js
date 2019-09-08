"use strict";

// CONFIGURACIÓN
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

var config = {
	fecha:"2019-08-30", // YYYY-MM-DD
	posicionMaxima: 30, // Mostrar palabras hasta el puesto... 
	peorEvolucion: -2,	// Máximo valor negativo de caida
};

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::







document.addEventListener('DOMContentLoaded',() =>{
	//importan datos
	fetch('data.json')
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			var datos = myJson;

			// ordenar
			datos.sort(function(a,b){
				if(a["Google es-AR Rank"] >= b["Google es-AR Rank"]){
					return 1;
				}
				if(a["Google es-AR Rank"] < b["Google es-AR Rank"]){
					return -1;
				}
			});

			datos.forEach((obj, index) => {

				//filtros
				if(
					obj["Google es-AR SERP Date"] == config.fecha 
					&& obj["Google es-AR Rank"] <= config.posicionMaxima 
					&& obj["Google es-AR Change (vs previous date)"] >= config.peorEvolucion
				){

					//render
						var tabla = document.querySelector('#tabla');
						var row = document.createElement('DIV'); 
						row.classList.add('row');
						row.innerHTML = `
							<div class="col palabra">${obj.Keyword}</div>
							<div class="col label">${obj.Labels}</div>
							<div class="col rank">${obj["Google es-AR Rank"]}</div>
							<div class="col change">${obj["Google es-AR Change (vs previous date)"]}</div>
							<div class="col url"><span>${obj["Google Mobile es-AR URL"]}</span></div>
						`;
						if(
							obj["Google es-AR Change (vs previous date)"] > 0 ){
							row.classList.add('up');
						}
						tabla.appendChild(row);
					}

			});
		});
		
});	