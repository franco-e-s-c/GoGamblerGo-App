async function onloadRes(){
    window.Bridge.cargarRes()  
}

window.Bridge.cargarR((event, resumen)=>{
    res = resumen
    console.log(res)
    document.getElementById("sujetoSelec").innerHTML = res[14]//res[12] Cambie id por nombre
    document.getElementById("configSelec").innerHTML = res[13]
    document.getElementById("gananciaA").innerHTML = res[0]
    document.getElementById("perdidaA").innerHTML = res[1]
    document.getElementById("gananciaB").innerHTML = res[2]
    document.getElementById("perdidaB").innerHTML = res[3]
    document.getElementById("gananciaC").innerHTML = res[4]
    document.getElementById("perdidaC").innerHTML = res[5]
    document.getElementById("gananciaD").innerHTML = res[6]
    document.getElementById("perdidaD").innerHTML = res[7]
    document.getElementById("bancoIni").innerHTML = res[8]
    config = res[9]
    if(config == "1"){
        document.getElementById("terminacion").innerHTML = "Selections"
        document.getElementById("tiempo").innerHTML = "No"
        document.getElementById("selecciones").innerHTML = res[11]
    }
    else if(config == "2"){
        document.getElementById("terminacion").innerHTML = "Time"
        document.getElementById("tiempo").innerHTML = res[10]
        document.getElementById("selecciones").innerHTML = "No"
    }
})