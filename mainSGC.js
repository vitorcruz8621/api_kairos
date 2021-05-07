class horariosSGC {
    marcacoes

    constructor(){
        this.marcacoes = this.retornarMarcacoes()
    }
    
    retornarMarcacoes() {
        var arrHoras = []
        const arrHorasMisturadas = [...document.querySelector("#chamadoIt > tbody").rows].map(element => {
            return {
                'data' : element.querySelector("td:nth-child(1)").innerText,
                'horas' : element.querySelector("td:nth-child(2)").innerText
            }
        });

        function horarioString(tempo,habilitarSinalPositivo){
            var horas = Math.floor(Math.abs(tempo)/60 )
            var minutos = Math.abs(Math.abs(tempo) - (horas * 60) )
            var sinal = "";
            
            if (tempo > 0 && habilitarSinalPositivo) sinal = "+";
            else if ( tempo < 0) sinal = "-";
            return ( sinal + ( (horas.toString()).padStart(2, "0") ).concat(":").concat( (minutos.toString()).padStart(2, "0")) );
        }
    
        for (var cont = 0; cont < ((arrHorasMisturadas.length)); cont=cont+4) {
            var horas = 0;
            var minutos = (
                (
                    (
                        (parseInt(arrHorasMisturadas[cont+3].horas.substring(0,2)) * 60) 
                        + (parseInt(arrHorasMisturadas[cont+3].horas.substring(3,5)))
                    ) 
                    - 
                    (
                        (parseInt(arrHorasMisturadas[cont+2].horas.substring(0,2)) * 60) 
                        + (parseInt(arrHorasMisturadas[cont+2].horas.substring(3,5)))
                    )
                )
                + 
                (
                    (
                        (parseInt(arrHorasMisturadas[cont+1].horas.substring(0,2)) * 60) 
                        + (parseInt(arrHorasMisturadas[cont+1].horas.substring(3,5))) ) 
                    - 
                    ( 
                        (parseInt(arrHorasMisturadas[cont+0].horas.substring(0,2)) * 60) 
                        + (parseInt(arrHorasMisturadas[cont+0].horas.substring(3,5)))
                    )
                )
            )
    
            arrHoras.push({
                'data' : arrHorasMisturadas[cont].data,
                'horario' : horarioString(minutos, false),
                'diferencaSaldoDia' : horarioString(minutos - 480, true)
                //'horario' : ( (horas.toString()).padStart(2, "0") ).concat(":").concat( (minutos.toString()).padStart(2, "0") )
            })
        }
    
        return arrHoras
    }
}

var main = new horariosSGC()