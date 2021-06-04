class Main {
    arrayMarcacoesMes

    constructor(){
        this.arrayMarcacoesMes = (() => {
            return ([...document.querySelectorAll("#template > table:nth-child(2) > tbody:nth-child(2) > tr")].map(element => {
                var dataAtual = element.querySelector("td:nth-child(1)").innerText;
                var dadosDoDia = {
                    'dataMarcacao' : dataAtual,
                    'horarioPadrao' : element.querySelector("td:nth-child(2)").innerText,
                    'marcacoesBatidas' : ((marcacaoAtual = element.querySelector("td:nth-child(3)").innerText)=> {
                        var marcacoesArray = marcacaoAtual.match(/[0-2][0-9]:[0-9][0-9]/gm)
                        if (marcacoesArray.length === 0 ) throw new Error(`Marcacao do dia '${dataAtual}' não tem batidas.`)
                        else if (marcacoesArray.length % 2 !== 0 ) throw new Error(`Marcacao do dia '${dataAtual}' apresenta batidas ímpares.`)
                        else return marcacoesArray
                    })(),
                    'horasTrabalhadas' : element.querySelector("td:nth-child(4)").innerText,
                    'diferenca': {
                        'debito' : element.querySelector("td:nth-child(10)").innerText,
                        'credito' : element.querySelector("td:nth-child(11)").innerText,
                        'valorAbsoluto' : ""
                    }
                }
                return dadosDoDia
            }))
        })()
    }

    retornarSaldoMes() {
        var saldoMes = (() => {
            var arrSaldoDiario = this.arrayMarcacoesMes.map(element => ( (parseInt(element.horasTrabalhadas.substring(0,2)) * 60) + (parseInt(element.horasTrabalhadas.substring(3,5)) )));
            var totalMinutosSaldoMes = arrSaldoDiario.reduce((total, atual) => total + atual)
            var horas = Math.floor(this.totalMinutosSaldoMes / 60);
            var minutos = totalMinutosSaldoMes - (horas * 60)
            return (horas.toString()).concat(":").concat(minutos.toString())
        })()

        return saldoMes;
    }

    listarMarcacoes(){
        this.arrayMarcacoesMes.forEach(element => console.log(element))
    }
}