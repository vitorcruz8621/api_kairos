var arrTbody = [...document.querySelector("#chamadoIt > tbody").rows]
var keyData = "01/04/2021"

function retornarMinutosTotais (tdElemt) {
	return (
		( ((60 * parseInt(tdElemt[3].querySelector("td:nth-child(2)").innerText.substr(0,2)) ) + parseInt(tdElemt[3].querySelector("td:nth-child(2)").innerText.substr(3,5)) ) -
		  ((60 * parseInt(tdElemt[2].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[2].querySelector("td:nth-child(2)").innerText.substr(3,5))) ) + 
		( ((60 * parseInt(tdElemt[1].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[1].querySelector("td:nth-child(2)").innerText.substr(3,5)) ) -
		  ((60 * parseInt(tdElemt[0].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[0].querySelector("td:nth-child(2)").innerText.substr(3,5))) )
	)
}

function retornarJsonDatas (arrTbody, keyData) {
	var arrayJson = [];
	while ( keyData !== "31/04/2021") {
		var tdElemt = arrTbody.filter(element => (element.querySelector("td:nth-child(1)").innerText).match(new RegExp(keyData)) );
		
		if (tdElemt != null && tdElemt !== "" && tdElemt != []) {
			var minutosTotais = (
				( ((60 * parseInt(tdElemt[3].querySelector("td:nth-child(2)").innerText.substr(0,2)) ) + parseInt(tdElemt[3].querySelector("td:nth-child(2)").innerText.substr(3,5)) ) -
				  ((60 * parseInt(tdElemt[2].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[2].querySelector("td:nth-child(2)").innerText.substr(3,5))) ) + 
				( ((60 * parseInt(tdElemt[1].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[1].querySelector("td:nth-child(2)").innerText.substr(3,5)) ) -
				  ((60 * parseInt(tdElemt[0].querySelector("td:nth-child(2)").innerText.substr(0,2))) + parseInt(tdElemt[0].querySelector("td:nth-child(2)").innerText.substr(3,5))) )
			)
			var horasTrabalhadas = ((minutosTotais=this.minutosTotais) => {
				for (var horas=0; minutosTotais >= 60; minutosTotais=minutosTotais-60, horas++);
				return ( (horas).toString().padStart(2, "0") ).concat(":").concat( (minutosTotais).toString().padStart(2, "0") );
			})
			
			var jsonObjeto = {
				'data' : keyData,
				'horasTrabalhadas' : horasTrabalhadas
			}
			
			arrayJson.push(jsonObjeto)
		
		}
		
		keyData = ((parseInt(keyData.substr(0,2)) + 1).toString()).padStart(2, "0");
	}
	
	return arrayJson;	
}

function converterEmMinutosTrabalhados(arrHorasSgcMisturadas ) {
	var arrMinutosTotais = [];
    for (var cont=0; cont < arrHorasSgcMisturadas.length; cont=cont+4) {
		var minutos = (
			( ((60 * parseInt(arrHorasSgcMisturadas[cont+3].substr(0,2))) + parseInt(arrHorasSgcMisturadas[cont+3].substr(3,5)) ) -
			  ((60 * parseInt(arrHorasSgcMisturadas[cont+2].substr(0,2))) + parseInt(arrHorasSgcMisturadas[cont+2].substr(3,5))) ) + 
			( ((60 * parseInt(arrHorasSgcMisturadas[cont+1].substr(0,2))) + parseInt(arrHorasSgcMisturadas[cont+1].substr(3,5)) ) -
			  ((60 * parseInt(arrHorasSgcMisturadas[cont].substr(0,2))) + parseInt(arrHorasSgcMisturadas[cont].substr(3,5))) )
		)
		arrMinutosTotais.push(minutos)
    }
	
	return arrMinutosTotais
}



var arrHorasMisturadas = arrTbody.map(elem => {
	elem.querySelector("td:nth-child(2)").innerText
})

var arrMinutosTotaisTrabalhadosPorDia = converterEmMinutosTrabalhados(arrHorasMisturadas)

function converterEmHorasTrabalhadas (arrMinutosTotaisTrabalhadosPorDia) {
	return arrMinutosTotaisTrabalhadosPorDia.map(minutos => {
		for (var horas=0; minutos >= 60; horas++, minutos=minutos-60);
		return ((horas).toString().padStart(2, "0")).concat(":").concat((minutos).toString().padStart(2, "0"));
	})
}

var arrHorasTrabalhadas = converterEmHorasTrabalhadas (arrMinutosTotaisTrabalhadosPorDia)