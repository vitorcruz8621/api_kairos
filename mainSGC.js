class horariosSGC {
    marcacoes

    constructor(){
        this.marcacoes = this.retornarMarcacoes()
    }
    
    //MÉTODOS À TESTAR
    adicionarUmDia(keyData) {
        return new((parseInt(keyData.substring(0,2)))+1).toString().padStart(2,"0").concat(keyData.substring(2,10))
    }

    newRegExp (keyData) {
        return match(keyData.substring(0,2)+"/"+keyData.substring(3,10))
    }

    retornarObjMarcacaoValido (arrHorasMisturadas, keyData) {
        var objAtual = arrHorasMisturadas.filter( (element, index) => {
            if (element.data === keyData) {
                if (index % 2 === 0 && element.movimento !== "ENTRADA")
                    throw new Error("A marcação '"+element.data+" "+element.marcacaoHorario+" "+element.movimento+"' deveria ter o movimento 'ENTRADA'");
                else if (index % 2 === 1 && element.movimento !== "SAÍDA")
                    throw new Error("A marcação '"+element.data+" "+element.marcacaoHorario+" "+element.movimento+"' deveria ter o movimento 'SAÍDA'");
                else 
                    return element
            } else console.log(index)
        })

        if (objAtual.length % 2 !== 0 ) {
            throw new Error("A data "+ keyData +" possue uma quantidade ímpar de marcações.")
        }

        console.log("Ocorreu tudo bem!")
        return objAtual;
    }

    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------
    
    //VALIDAÇÃO
    retornarArrMarcacaoValido() {
        // TODO: 1) pegar a informação da intranet referente ao mês específico das mascações
        // TODO: 2) Com a informação de "1)", definir o startPoint(01/mm/aaaa) e o endPont([28||30||31]/mm/aaaa)
        var keyData = "01/04/2021"
        var arrJsonMarcacoes = []
        var arrHorasMisturadas = [...document.querySelector("#chamadoIt > tbody").rows].map(element => {
            return {
                'data' : element.querySelector("td:nth-child(1)").innerText,
                'marcacaoHorario' : element.querySelector("td:nth-child(2)").innerText,
                'movimento' : element.querySelector("td:nth-child(3)").innerText
            }
        });

        while (keyData !== "31/04/2021") {
            var objAtual = this.retornarObjMarcacaoValido(arrHorasMisturadas, keyData)
            keyData = adicionarUmDia(keyData);
            arrJsonMarcacoes.push(objAtual);
        }     

        return arrJsonMarcacoes;
    }
    
    retornarMarcacoes() {
        var arrHoras = []
        const arrHorasMisturadas = [...document.querySelector("#chamadoIt > tbody").rows].map(element => {
            return {
                'data' : element.querySelector("td:nth-child(1)").innerText,
                'marcacaoHorario' : element.querySelector("td:nth-child(2)").innerText
            }
        });

        function horarioString(tempo,habilitarSinalPositivo){
            var horas = Math.floor(Math.abs(tempo)/60 )
            var minutos = Math.abs(Math.abs(tempo) - (horas * 60) )
            var sinal = "";
            
            if (tempo >= 0 && habilitarSinalPositivo) sinal = "+";
            else if ( tempo < 0) sinal = "-";
            return ( sinal + ( (horas.toString()).padStart(2, "0") ).concat(":").concat( (minutos.toString()).padStart(2, "0")) );
        }
        

        //TODO 3) Invorcar o método "retornarArrMarcacaoValido()" para formatar e validar 
        //  os dados brutos das marcações individuáis da Intranet.
        //TODO 4) Remover/Adaptar o bloco FOR_LOOP abaixo para casos onde marcações!=4
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
                'saldoDoDia' : horarioString(minutos, false),
                'diferencaSaldoDia' : horarioString(minutos - 480, true)
                //'horario' : ( (horas.toString()).padStart(2, "0") ).concat(":").concat( (minutos.toString()).padStart(2, "0") )
            })
        }
    
        return arrHoras
    }
}

var main = new horariosSGC()