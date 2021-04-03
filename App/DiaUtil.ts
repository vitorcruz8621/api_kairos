import { Atributos } from './Atributos'

export class DiaUtil {
    private dataMarcacao: string
    private horarioNormal: string
    private horasRegistradas: string
    private totalHorasTrabalhadas: string

    constructor(pDomDiaSelec : any) {
        this.dataMarcacao = pDomDiaSelec.querySelector(`td:nth-child(${Atributos.DataDaMarcacao})`)
        this.horarioNormal = pDomDiaSelec.querySelector(`td:nth-child(${Atributos.HorarioPadrao})`)
        this.horasRegistradas = pDomDiaSelec.querySelector(`td:nth-child(${Atributos.HorasRegistradas})`)
        this.totalHorasTrabalhadas = pDomDiaSelec.querySelector(`td:nth-child(${Atributos.TotalHorasTrabalhadas})`)
    }

    public getDataMarcacao () : string {
        return this.dataMarcacao;
    }

    public getHorarioNormal () : string {
        return this.horarioNormal;
    }

    public getHorasRegistradas () : string {
        return this.horasRegistradas;
    }

    public getTotalHorasTrabalhadas () : string {
        return this.totalHorasTrabalhadas;
    }

}