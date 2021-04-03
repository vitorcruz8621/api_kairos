import { DiaUtil } from './DiaUtil'

let domMesAtual : any = document.querySelector('#template > table:nth-child(2) > tbody:nth-child(2)')
const DIAS_TRABALHADOS : any = domMesAtual.rows.length
let domDiaSelec : any
let nuDiaSelec : number = 0
let objDiaSelec : DiaUtil

//usar uma Regex para impor na condição do LOOP
while ( nuDiaSelec < 1 || nuDiaSelec > DIAS_TRABALHADOS ) {
    let nuDiaSelecString : string = prompt("Insira o dia que você quer visualisar.");
    nuDiaSelec : number = nuDiaSelec.
}

domDiaSelec = domMesAtual.querySelector(`tr:nth-child(${nuDiaSelec})`)
objDiaSelec = new DiaUtil(domDiaSelec)