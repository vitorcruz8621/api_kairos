class DiaUtil {
    dataMarcacao
    horarioNormal
    horasRegistradas
    totalHorasTrabalhadas

    constructor(pDomDiaSelec) {
        this.dataMarcacao = pDomDiaSelec.querySelector('td:nth-child(1)').innerHTML
        this.horarioNormal = pDomDiaSelec.querySelector('td:nth-child(2)').innerHTML
        this.horasRegistradas = pDomDiaSelec.querySelector('td:nth-child(3)').innerHTML
        this.totalHorasTrabalhadas = pDomDiaSelec.querySelector('td:nth-child(4)').innerHTML
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

    getTotalHorasTrabalhadas () {
        return this.totalHorasTrabalhadas;
    }
}

class Main {

    domMesAtual = document.querySelector('#template > table:nth-child(2) > tbody:nth-child(2)')
    DIAS_TRABALHADOS = document.querySelector('#template > table:nth-child(2) > tbody:nth-child(2)').rows.length
    domDiaSelec = undefined
    nuDiaSelec = 0
    objDiaSelec = undefined

    start () {
        while ( this.nuDiaSelec < 1 || this.nuDiaSelec > this.DIAS_TRABALHADOS ) {
            this.nuDiaSelec = prompt("Insira o dia que você quer visualisar.");
        }
    
        this.domDiaSelec = this.domMesAtual.querySelector('tr:nth-child('+this.nuDiaSelec+')')
        this.objDiaSelec = new DiaUtil(this.domDiaSelec)

        console.log("Data da Marcação: " + this.objDiaSelec.getDataMarcacao())
        console.log("Horário Default ou Situação: " + this.objDiaSelec.getHorarioNormal())
        console.log("Marcações Registradas: " + this.objDiaSelec.getHorasRegistradas())
        console.log("Total de Horas Trabalhadas: " + this.objDiaSelec.getTotalHorasTrabalhadas())
    }
}

function start() {
	new Main().start()
}