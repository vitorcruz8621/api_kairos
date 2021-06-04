var listaApontamentosChannel = ([...document.querySelector("#tblListagem").rows].reverse()).map((elemento) => {
    return { 
        'dataApontada' : elemento.querySelector("#tblListagem > tr > td > .arial11").innerText.trim(),
        'duracao' : elemento.querySelector("#span_duracao_total_undefined").innerText
    }
})
var saldoDiarioChannel = listaApontamentosChannel.map(element => element.duracao)
var saldoDoMesChannel = saldoDiarioChannel.reduce((total, atual) => total + atual)