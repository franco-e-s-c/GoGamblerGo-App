let startTime = new Date();
var A = 0
var B = 0
var C = 0
var D = 0
var I = 0
var cont = 0

let mazoA = []
let mazoMes = []
let configFlagI
let tiempoI
let seleccionesI
let mezcladoA = []
let mezcladoB = []
let mezcladoC = []
let mezcladoD = []
let bancoini
let bancoini2
let configFlag
let tiempo = 0
let selecciones = 0
let clickCar
let moverCar
let moverCarEnd
let seleccion
let ganancia
let perdida
let total
let miliSeconds
let flagPausa = 0
let nombre
let ani


cartaA = document.getElementById("Am");
cartaB = document.getElementById("Bm");

cartaA.addEventListener("click", ()=>{
 })

cartaB.addEventListener("click", ()=>{
        

 })

function onloadIGT(){
    window.Bridge.cargarIGT()
    tiempoIni = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    window.Bridge.enviarTiempo(tiempoIni, tiempoIni, tiempoIni, tiempoIni, "A", "0", "0", "0", tiempoIni, tiempoIni);
}

async function reset(){
    window.Bridge.reset()
}

window.Bridge.cargarC((event, configuracion) => {
    console.log(configuracion)
    nombre = configuracion[0]
        rean = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3}))
    //console.log(mezclado)
    mezcladoA = configuracion[9]
    mezcladoB = configuracion[10]
    mezcladoC = configuracion[11]
    mezcladoD = configuracion[12]
    configFlagI = configuracion[16]
    seleccionesI = configuracion[14]
    tiempoI = configuracion[13]*1000
    bancoini = configuracion[15]
    bancoini2 = bancoini
    ani = configuracion[17]
    console.log("ANI", ani)
    if (ani == true){
        document.getElementById("Am").setAttribute("onclick", "crear(this)")
        document.getElementById("Bm").setAttribute("onclick", "crear(this)")
        document.getElementById("Cm").setAttribute("onclick", "crear(this)")
        document.getElementById("Dm").setAttribute("onclick", "crear(this)")
    }
    document.getElementById("puntos").innerHTML = bancoini
    if(configFlagI=="2"){
        setTimeout(()=>{
            setTimeout(() => {
                window.Bridge.finIgt()
                document.getElementById("over").classList.add("oscurecer")
            },3600) 
        },tiempoI)
    }
})
function crear2(element){
    terminar(I)
    fondo = document.getElementById("fondo-d")
    fondo.style.cssText = "z-index: 999; pointer-events: all;"
    id = element.id
    miliSeconds = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    inicio = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    clickCar = new Date()
    console.log("CLICK", clickCar)
    newId = id.replace('m','')
    I++
    if(id == "Am"){
        seleccion = 'A'
        ganancia = mezcladoA[A][0]
        perdida = mezcladoA[A][1]
        mazo="A" 
        A++
    }
    else if(id == "Bm"){
        seleccion = 'B'
        ganancia = mezcladoB[B][0]
        perdida = mezcladoB[B][1]
        mazo="B"
        B++ 
    }
    else if(id == "Cm"){
        seleccion = 'C'
        ganancia = mezcladoC[C][0]
        perdida = mezcladoC[C][1]
        mazo="C" 
        C++
    }
    else if(id == "Dm"){
        seleccion = 'D'
        ganancia = mezcladoD[D][0]
        perdida = mezcladoD[D][1]
        mazo="D"
        D++ 
    }
    codigo = `
        <div class="carta">
        <div class="carta-lomo">
            <img src="src/doodad.jpg" alt="" class="dorso">
        </div>
        <div class="carta-info">
        <ul>
            <li>
                <p class="carta-texto">You win: </p>
            </li>
            <li>
                <p class="carta-texto" id="win">${ganancia}</p>
            </li>
            <li>    
                <p class="carta-texto">You lose: </p>
            </li>
            <li>
                <p class="carta-texto" id="loss">${perdida}</p>
            </li>
        </ul>
        </div>
        `
    document.getElementById(mazo).innerHTML=codigo;
    iniRetro = new Date()
    voltearCar = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City',timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    console.log("INICIO RETRO", iniRetro)
    console.log("DIFERENCIA CLICK INI", iniRetro - clickCar)
    element = document.getElementById(mazo)
    element.classList.add("animation")
    countTo()
    setTimeout(()=>{
        const elements = document.body.getElementsByTagName('*')
        const borrar = document.getElementById("fondo-d")
        borrar.innerHTML=""
        finRetro = new Date()
        finR = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City',timeZoneName:'longOffset',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3}))
        console.log("FIN RETRO", finRetro)
        console.log("DIFERENCIA FIN INICIO", finRetro - iniRetro)
        borrar.style.cssText = ""
        fin = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3}))
        inter = fin - inicio
        borrar.innerHTML = `<div class="flip-card" id="A">
                            </div>
                            <div class="flip-card" id="B">
                            </div>
                            <div class="flip-card" id="C">
                            </div>
                            <div class="flip-card" id="D">
                            </div>`
        element.classList.add("none")
        reanudar = new Date()
        // if (I==2){
        //     rean = 1
        // }
        if (flagPausa!=1){
            window.Bridge.enviarTiempo(miliSeconds, voltearCar, inter, tiempoIni, seleccion, ganancia, perdida, bancoini2, finR, rean);
            rean = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            fractionalSecondDigits: 3}))
        }
        console.log("INICIO", reanudar)
    }, 2000)
}
function moverC(element, newId){
    //moverCar = new Date() - clickCar
    moverCar = new Date()
    console.log("INICIA ANIMACION MOVER CARTA", moverCar)
    console.log("DIFERENCIA CLICK MOVER CAR", moverCar - clickCar)
    element.classList.add("mover" + newId);
    element.classList.add("grandeC");
    /*var cartaC = element.getElementsByTagName('div')
    for (var n = 0; n<cartaC.length; n++){
        if(cartaC[n].className == "carta-lomo"){
            var img = cartaC[n].getElementsByTagName('*')
            //img[0].classList.add('grandeI')
        }
        //cartaC[n].classList.add('grandeC')
    }*/
    /*document.getElementById("B").className = "flip-card nada";
    document.getElementById("C").className = "flip-card nada";
    document.getElementById("D").className = "flip-card nada";*/
    const elements = document.body.getElementsByTagName('*')
    for (var i = 0; i<elements.length; i++){
        elements[i].classList.add('blur')
        if (elements[i].id == element.id){
            elements[i].classList.remove('blur')
        }
    }
    var carta = element.getElementsByTagName('*')
    //console.log(carta)
    for (var c = 0; c<carta.length; c++){
        //console.log(carta[c])
        carta[c].classList.remove('blur')
    }
    document.getElementById("fondo-d").classList.remove('blur')
    document.getElementById("score").classList.remove('blur')
    puntos = document.getElementById("score").getElementsByTagName('*');
    for (var p = 0; p<puntos.length; p++){
        //console.log(puntos[p])
        puntos[p].classList.remove('blur')
    }

    setTimeout(()=>{
        //moverCarEnd = new Date() - moverCar
        moverCarEnd = new Date()
        console.log("FIN ANIMACION MOVER CARTA", moverCarEnd)
        console.log("DIFERENCIA", moverCarEnd - miliSeconds)
        //console.log("SETTIMEOUT")
        animacion(element,newId);}, 800)
}

async function animacion(element,newId){
    voltearCar = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City',timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    volt = new Date()
    console.log("INICIA ANIMACION VOLTEAR CARTA", voltearCar)
    console.log("DIFERENCIA ANIM CLICK", volt - clickCar)
    console.log("DIFERENCIA ANIM MOVER", volt - moverCar)
    //console.log("ANIMACION")
    countTo()
    element.classList.add("animation")
    //NUEVOOOOOOO
    setTimeout(()=>{
        codigo = `
        <div class="carta">
        <div class="carta-lomo">
            <img src="src/doodad.jpg" alt="" class="dorso">
        </div>
        <div class="carta-info">
        <ul>
            <li>
                <p class="carta-texto">You win: </p>
            </li>
            <li>
                <p class="carta-texto" id="win">+${ganancia}</p>
            </li>
            <li>    
                <p class="carta-texto">You lose: </p>
            </li>
            <li>
                <p class="carta-texto" id="loss">${perdida}</p>
            </li>
        </ul>
        </div>
        `
        mostrar = new Date()
        console.log("DIFERENCIA mostrar CLICK", mostrar - clickCar)
        console.log("DIFERENCIA mostrar VOLT", mostrar - volt)
        document.getElementById(mazo).innerHTML=codigo;
        console.log("3000")
    }, 800)
    //NUEVOOOO
    diferenciaAntes = voltearCar - miliSeconds
    console.log("ANTES", diferenciaAntes)
    //console.log("HTML > Renderer")
    /*var s = new Date().getSeconds();
    var ms = new Date().getMilliseconds();
    var timestamp = s + ":" + ms
    console.log(timestamp)*/
    var rect = element.getBoundingClientRect();
    //console.log(rect.top, rect.right, rect.bottom, rect.left);
    setTimeout(() => {
        voltearCarEnd = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City',timeZoneName:'longOffset',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        fractionalSecondDigits: 3}))
        console.log("TERMINA ANIMACION VOLTEAR CARTA", voltearCarEnd)
        sacarCar = new Date()
        console.log("DIFERENCIA sacar mostrar", sacarCar - mostrar)

        console.log("INICIA ANIMACION SACAR CARTA", sacarCar)
        element.classList.add("sacar"+newId);
        //console.log("SACAR")
                      setTimeout(() => {
                                        sacarCarEnd = new Date()
                                        console.log("TERMINA ANIMACION SACAR CARTA", sacarCarEnd)   
                                        diferenciaDespues = sacarCarEnd - sacarCar
                                        console.log("Diferencia Despues", diferenciaDespues)   
                                        vovler(element,newId);
                                        //console.log("NONE")
                                        element.classList.add("none");}, 800);}, 2000)
    //setTimeout(() => {vovler(element);}, 3000)
    
}

function vovler(element,newId){
    document.getElementById("oscurecer").classList.remove("oscurecer")
    document.getElementById("oscurecer").classList.add("aclarar")
    const elements = document.body.getElementsByTagName('*')
    const borrar = document.getElementById("fondo-d")
    borrar.innerHTML=""
    borrar.style.cssText = ""
    for (var i = 0; i<elements.length; i++){
        elements[i].classList.remove('blur')
    }
    finRetro = new Date()
    finR = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City',timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    //console.log("VOVLER")
    fin = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    inter = fin - inicio
    window.Bridge.enviarTiempo(miliSeconds, voltearCar, inter, tiempoIni, seleccion, ganancia, perdida, bancoini2, finR, rean);
    rean = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    borrar.innerHTML = `<div class="flip-card" id="A">
    </div>
    <div class="flip-card" id="B">
    </div>
    <div class="flip-card" id="C">
    </div>
    <div class="flip-card" id="D">
    </div>`
}

document.addEventListener('load', function(){
    startTime = new Date();
})

function terminar(I){
    //console.log("III",I)
    //console.log("SELECCIONES", seleccionesI)
    if(I==seleccionesI-1){
        setTimeout(() => {
            window.Bridge.finIgt()
            document.getElementById("over").classList.add("oscurecer")
        },2000) 
    }
    
}

function despausa(){
    document.getElementById("pausa").classList.remove("oscurecerP")
    document.getElementById("pausa").classList.add("aclararP")
}

function crear(element){
    //console.log("SELE",seleccionesI)
    terminar(I)
    //console.log("COOOONT", cont)
    /*ganancia = mazoMes[cont][0]
    perdida = mazoMes[cont][1]*/
    document.getElementById("oscurecer").classList.remove("aclarar")
    document.getElementById("oscurecer").classList.add("oscurecer")
    fondo = document.getElementById("fondo-d")
    fondo.style.cssText = "z-index: 999; pointer-events: all;"
    id = element.id
    miliSeconds = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    inicio = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/Mexico_City', timeZoneName:'longOffset',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3}))
    //window.Bridge.enviarTiempo(miliSeconds);
    clickCar = new Date()
    //console.log("CLICK CARTA ", clickCar)
    //console.log(miliSeconds/1000 + "Seconds.")
    newId = id.replace('m','')
    //console.log(newId)
    I++
    if(id == "Am"){
        seleccion = 'A'
        ganancia = mezcladoA[A][0]
        perdida = mezcladoA[A][1]
        mazo="A" 
        A++
    }
    else if(id == "Bm"){
        seleccion = 'B'
        ganancia = mezcladoB[B][0]
        perdida = mezcladoB[B][1]
        mazo="B"
        B++ 
    }
    else if(id == "Cm"){
        seleccion = 'C'
        ganancia = mezcladoC[C][0]
        perdida = mezcladoC[C][1]
        mazo="C" 
        C++
    }
    else if(id == "Dm"){
        seleccion = 'D'
        ganancia = mezcladoD[D][0]
        perdida = mezcladoD[D][1]
        mazo="D"
        D++ 
    }
    // codigo = `
    //     <div class="carta">
    //     <div class="carta-lomo">
    //         <img src="src/doodad.jpg" alt="" class="dorso">
    //     </div>
    //     <div class="carta-info">
    //     <ul>
            // <li>
            //     <p class="carta-texto">Ganas: </p>
            // </li>
            // <li>
            //     <p class="carta-texto" id="win">+${ganancia}</p>
            // </li>
            // <li>    
            //     <p class="carta-texto">Pierdes: </p>
            // </li>
            // <li>
            //     <p class="carta-texto" id="loss">${perdida}</p>
            // </li>
    //     </ul>
    //     </div>
    //     `
    // document.getElementById(mazo).innerHTML=codigo;
    codigo = `
        <div class="carta">
        <div class="carta-lomo">
            <img src="src/doodad.jpg" alt="" class="dorso">
        </div>
        <div class="carta-info">
        <ul>
            <li>
                <p class="carta-texto"></p>
            </li>
            <li>
                <p class="carta-texto" id="win"></p>
            </li>
            <li>    
                <p class="carta-texto"></p>
            </li>
            <li>
                <p class="carta-texto" id="loss"></p>
            </li>
        </ul>
        </div>
        `
    document.getElementById(mazo).innerHTML=codigo;
    newElement = document.getElementById(mazo)
    //console.log("MOVERC")
    moverC(newElement, newId);
    /*setTimeout(() => {
        console.log("MOVERC")
        moverC(newElement, newId);}, 0) */
}

function eliminar(element){
    document.getElementById("A").innerHTML= "";
}   

function countTo(){
    let from = parseInt(document.getElementById("puntos").innerHTML);
    let win = parseInt(document.getElementById("win").innerHTML)
    let loss = parseInt(document.getElementById("loss").innerHTML)
    console.log("PERDIDAAAA", loss)
    total = ganancia+perdida
    console.log("TOTAL", total)
    bancoini2 = bancoini2+total
    console.log("ACTUAL", bancoini2)
    //total2 = actual+total


    let to = from+total
    let interval = 30;
    let step = total
    if (Math.abs(from-to) >=100){
        interval = 15
    }
    if (Math.abs(from-to) >=200){
        interval = 10
    }
    if (Math.abs(from-to) >=300){
        interval = 1
    }
    console.log("step", step)

    if(from == to){
        document.querySelector("#puntos").textContent = from;
        total = document.querySelector("#puntos").innerHTML
        console.log("ADSD", total)
        return;
    }

    let counter = setInterval(function(){
        from += step;
        document.querySelector("#puntos").textContent = from;
        total = document.querySelector("#puntos").innerHTML
        console.log("ADSD", total)

        if(from == to){
            clearInterval(counter);
        }
    }, interval);
}

let medidas = document.getElementById("fondo")
let ancho = medidas.offsetWidth
let alto = medidas.offsetHeight

medidas = document.getElementById("oscurecer")
ancho = medidas.offsetWidth
alto = medidas.offsetHeight


