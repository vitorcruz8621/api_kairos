class DiaUtil {
    dataMarcacao
    horarioNormal
    horasRegistradas
    totalhrsTrab

    constructor(pDomDiaSelec) {
        this.dataMarcacao = pDomDiaSelec.querySelector('td:nth-child(1)').innerHTML
        this.horarioNormal = pDomDiaSelec.querySelector('td:nth-child(2)').innerHTML
        this.horasRegistradas = pDomDiaSelec.querySelector('td:nth-child(3)').innerHTML
        this.totalhrsTrab = pDomDiaSelec.querySelector('td:nth-child(4)').innerHTML
    }

    getDataMarcacao () {
        return this.dataMarcacao;
    }

    getHorarioNormal () {
        return this.horarioNormal;
    }

    getHorasRegistradas () {
        return this.horasRegistradas;
    }

    getTotalhrsTrab () {
        return this.totalhrsTrab;
    }
}

class Main {

    domMesAtual = document.querySelector('#template > table:nth-child(2) > tbody:nth-child(2)')
    MAX_DIA_RELATADO = this.domMesAtual.rows.length
    //DIAS_TRABALHADOS = [...document.querySelector('#template > table:nth-child(2) > tbody:nth-child(2)').rows].filter(diaTrb => diaTrb !== "")
	DIAS_TRABALHADOS = (([...this.domMesAtual.rows].map(hrsTrab => hrsTrab.querySelector('td:nth-child(2)').innerText))
            .filter(hrsTrab => !((/Compensado|Feriado|Descanso Semanal/gm).test(hrsTrab)) ) ).length;
    domDiaSelec = undefined
    nuDiaSelec = 0
    objDiaSelec = undefined

    selecionarDia() {
        while ( this.nuDiaSelec < 1 || this.nuDiaSelec > this.MAX_DIA_RELATADO ) {
            this.nuDiaSelec = prompt("Insira o dia que você quer visualisar.");
        }

        return this.nuDiaSelec
    }

    isDiaDeTrabalho(diaSelecionado){
        let situacaoDia = this.domMesAtual.querySelector('tr:nth-child('+diaSelecionado+') > '+'td:nth-child(2)').innerText
        const DIA_NAO_TRABALHADO = (/Compensado|Feriado|Descanso Semanal/gm)
        
        if ( DIA_NAO_TRABALHADO.test(situacaoDia) ) {
            return {'isDiaDeTrabalho': false, 'situacao' : situacaoDia};
        } else {
            return {'isDiaDeTrabalho': true, 'situacao' : situacaoDia}
        }
    }

    hrsTrabPorDiaArray () {
        return ([...this.domMesAtual.rows].map(hrsTrab => hrsTrab.querySelector("td:nth-child(4)").innerText))
            .filter(hrsTrab => hrsTrab !== "")
    }
	
	horasTrabalhadasMes () {
		var arrHrsTrabalhadas = (this.hrsTrabPorDiaArray()).map(horasEMinutos => {
            var divisorHorasEMinutos = horasEMinutos.split(":")
            var minutos = (60 * parseInt(divisorHorasEMinutos[0])) + parseInt(divisorHorasEMinutos[1])
            return minutos
		})
		
		return ((arrHrsTrabalhadas) => {
			var somaMinutos = arrHrsTrabalhadas.flat((a, b) => {return a + b})
			var somaHoras = 0;
			for (somaHoras; somaMinutos > 0; somaMinutos=somaMinutos-480, somaHoras++)
			return {
				"somaHoras" : somaHoras, "somaMinutos" : somaMinutos
			}
		})();
	}
	
	diffHrsTrabPorDiaArray () {
		return (this.hrsTrabPorDiaArray()).map(horasEMinutos => {
            var divisorHorasEMinutos = horasEMinutos.split(":")
            var minutos = (60 * parseInt(divisorHorasEMinutos[0])) + parseInt(divisorHorasEMinutos[1]) - 480
            return minutos
		})
	}
	
	diffHrsTrabPorDiaString() {
		var stringDiffHrs = (this.diffHrsTrabPorDiaArray()).reduce((a, b) => {
			return ( a.toString() + "(" + b.toString()+")" )
		}, "")
		stringDiffHrs = stringDiffHrs.replaceAll(/\)\(/gm, ")+(")
		stringDiffHrs = stringDiffHrs.replaceAll(/\)\+\(\-/gm, "-")
		stringDiffHrs = stringDiffHrs.replaceAll(/\(|\)/gm, "")
		return ("("+stringDiffHrs+")")
	}

    saldoAtual() {
        return ( ( this.diffHrsTrabPorDiaArray() ).reduce( (total, elem) => {
            return total + elem
        }, 0) )
    }

    calcularSaldoDia(arrayMarcacoes) {
        if (arrayMarcacoes.length % 2 === 0) {
            var totalMinutos =  0;
            for (var cont = 0; cont < arrayMarcacoes.length; cont = cont + 2) {
                totalMinutos += ( ( ( parseInt(arrayMarcacoes[cont + 1].substring(0,2)) * 60 ) + ( parseInt(arrayMarcacoes[cont + 1].substring(3,5)) ) ) - ( ( parseInt(arrayMarcacoes[cont].substring(0,2)) * 60 ) + ( parseInt(arrayMarcacoes[cont].substring(3,5)) ) ) )
            }
    
            var horas = Math.floor(totalMinutos / 60);
            var minutos = totalMinutos - (horas * 60);
    
            return ((horas.toString().padStart(2, "0")).concat(":").concat(minutos.toString().padStart(2, "0")))
        }
        throw new Error("Marcações impares!")
    }


    start () {
        let diaSelecionado = this.selecionarDia()
        let isDiaDeTrabalho = this.isDiaDeTrabalho(diaSelecionado)

        if (isDiaDeTrabalho.isDiaDeTrabalho) {
            this.domDiaSelec = this.domMesAtual.querySelector('tr:nth-child('+diaSelecionado+')')
            this.objDiaSelec = new DiaUtil(this.domDiaSelec)

            console.log("Data da Marcação: " + this.objDiaSelec.getDataMarcacao())
            console.log("Horário Default ou Situação: " + this.objDiaSelec.getHorarioNormal())
            console.log("Marcações Registradas: " + this.objDiaSelec.getHorasRegistradas())
            console.log("Total de Horas Trabalhadas: " + this.objDiaSelec.getTotalhrsTrab())
        } else {
            console.log(isDiaDeTrabalho.situacao)
        }
    }
}

function main(){
    return new Main();
}

function start() {
	Main().start()
}

function isDiaDeTrabalho(){
    return new Main().isDiaDeTrabalho()
}

main = main();