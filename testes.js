let arrayV = "08:47-12:30 13:36-17:54"
let objHorarios = null;

function retornar( arrayV) {
    return {
        'entrada_1' : (arrayV.split(" "))[0].split("-")[0],
        'saida_1' : (arrayV.split(" "))[0].split("-")[1],
        'entrada_2' : (arrayV.split(" "))[1].split("-")[0],
        'saida_2' : (arrayV.split(" "))[1].split("-")[1]
    }
}

objHorarios = retornar(arrayV)
for (elem in objHorarios) {
    console.log(objHorarios[elem])
}