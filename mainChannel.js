var listaApontamentosChannel = [...document.querySelector("#tblListagem").rows].map(elemento => {
    return { 
        'dataApontada' : elemento.querySelector("#tblListagem > tr > td > .arial11").innerText.trim(),
        'duracao' : elemento.querySelector("#span_duracao_total_undefined").innerText
    }
})