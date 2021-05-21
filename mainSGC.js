class HorariosSGC {
    marcacoes

    constructor(){
        this.marcacoes = this.retornarMarcacoes()
    }
    
    retornarMarcacoes() {
        function adicionarUmDia(keyData) {
            console.log("Executando: adicionarUmDia");
            console.log("Finalizando: adicionarUmDia");
            return ((parseInt(keyData.substring(0,2)))+1).toString().padStart(2,"0").concat(keyData.substring(2,10))
        }
        
        function validarBatidasERetoranrDiaFiltradoDiaFiltrado (arrHorasMisturadas, keyData) {
            console.log("Executando: validarBatidasERetoranrDiaFiltradoDiaFiltrado");
            const MOVIMENTO_ENTRADA = "ENTRADA", MOVIMENTO_SAIDA = "SAIDA";

            var objAtual = arrHorasMisturadas.filter( (element, index) => {
                if (element.data === keyData) {
                    if (index % 2 === 0 && element.movimento === MOVIMENTO_SAIDA)
                        throw new Error("A marcação '"+element.data+" "+element.marcacaoHorario+" "+element.movimento+"' deveria ter o movimento '"+MOVIMENTO_ENTRADA+"'.");
                    else if (index % 2 === 1 && element.movimento !== "SAIDA")
                        throw new Error("A marcação '"+element.data+" "+element.marcacaoHorario+" "+element.movimento+"' deveria ter o movimento '"+MOVIMENTO_SAIDA+"'.");
                    else 
                        return element
                }
            })

            if (objAtual.length % 2 !== 0 ) {
                throw new Error("A data "+ keyData +" possue uma quantidade ímpar de marcações.")
            }

            console.log("Finalizando: validarBatidasERetoranrDiaFiltradoDiaFiltrado");
            return objAtual;
        }
        
        //VALIDAÇÃO
        function retornarArrDiasTrabalhadosValido(pKeyDataMin, pKeyDataMax, pArrHorasMisturadas) {
            console.log("Executando: retornarArrDiasTrabalhadosValido");
            var arrJsonMarcacoes = [];

            for (var dataAtual = pKeyDataMin; dataAtual <= pKeyDataMax; dataAtual = adicionarUmDia(dataAtual) ) {
                var diaAtual = (new Date(dataAtual.substring(6,10), (parseInt(dataAtual.substring(3,5)) - 1), dataAtual.substring(0,2) )).getDay()
                if ( !( /0|6/.test(diaAtual) )) {//
                    var objAtual = validarBatidasERetoranrDiaFiltradoDiaFiltrado(pArrHorasMisturadas, dataAtual)
                    objAtual = retornarBatidasComoDiaTrabalhadoJson(objAtual);
                    arrJsonMarcacoes.push(objAtual);
                }
            }

            console.log("Finalizando: retornarArrDiasTrabalhadosValido");

            return arrJsonMarcacoes;
        }

        function montarMarcacaoeSaldoDoDia(pDataAtualMarcacoes) {
            var saldoDoDia = 0;
            var arrayMarcacoes = [];
            console.log("Executando: montarMarcacaoeSaldoDoDia");

            for (var cont =0; cont < pDataAtualMarcacoes.length; cont = cont + 2) {
                var horaEntrada = pDataAtualMarcacoes[cont]
                var horaSaida = pDataAtualMarcacoes[cont+1]

                saldoDoDia += (
                    ((parseInt(horaSaida.marcacaoHorario.substring(0,2)) * 60) + 
                    (parseInt(horaSaida.marcacaoHorario.substring(3,5)))) - 
                    ((parseInt(horaEntrada.marcacaoHorario.substring(0,2)) * 60) + 
                    (parseInt(horaEntrada.marcacaoHorario.substring(3,5))))
                )

                //arrayMarcacoes.concat(horaEntrada, horaSaida)
                arrayMarcacoes.push(horaEntrada);
                arrayMarcacoes.push(horaSaida);
            }

            console.log("Finalizando: montarMarcacaoeSaldoDoDia");

            return {
                'listaMarcacoes' : arrayMarcacoes,
                'saldoDoDia' : retornarCalculoHorarioComoString(saldoDoDia, false),
                'saldoDoDiaDiferenca' : retornarCalculoHorarioComoString(saldoDoDia - 480, true)
            }
        }

        //Retornar marcações filtradas do dia específico para formato JSON
        function retornarBatidasComoDiaTrabalhadoJson(pDataAtualMarcacoes) {
            console.log("Executando: retornarBatidasComoDiaTrabalhadoJson");

            var batidas = {
                'data' : pDataAtualMarcacoes[0].data,
                'marcacaoHorario' : montarMarcacaoeSaldoDoDia(pDataAtualMarcacoes)
            }

            console.log("Finalizando: retornarBatidasComoDiaTrabalhadoJson");

            return batidas
        }

        function retornarCalculoHorarioComoString(tempo,habilitarSinalPositivo){
            console.log("Executando: retornarCalculoHorarioComoString");
            var horas = Math.floor(Math.abs(tempo)/60 )
            var minutos = Math.abs(Math.abs(tempo) - (horas * 60) )
            var sinal = "";
            
            if (tempo >= 0 && habilitarSinalPositivo) sinal = "+";
            else if ( tempo < 0) sinal = "-";

            console.log("Finalizando: retornarCalculoHorarioComoString");

            return ( sinal + ( (horas.toString()).padStart(2, "0") ).concat(":").concat( (minutos.toString()).padStart(2, "0")) );
        }

        var arrHoras = []
        const arrHorasMisturadas = [...document.getElementById("chamadoIt").tBodies.item(0).rows].map(element => {
            
            return {
                'data' : element.querySelector("td:nth-child(1)").innerText,
                'marcacaoHorario' : element.querySelector("td:nth-child(2)").innerText,
                'movimento' : element.querySelector("td:nth-child(3)").innerText,
                'statusAutorizacao' : element.querySelector("td:nth-child(4)").innerText,
                'localidade' : element.querySelector("td:nth-child(5)").innerText,
                'justificativa' : element.querySelector("td:nth-child(6)").innerText
            }
        });

        arrHoras = retornarArrDiasTrabalhadosValido(
            arrHorasMisturadas[0].data, 
            arrHorasMisturadas[arrHorasMisturadas.length-1].data, 
            arrHorasMisturadas)
    
        return arrHoras
    }
}

var main = new HorariosSGC()