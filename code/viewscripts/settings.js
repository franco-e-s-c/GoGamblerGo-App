let nombresSet = []
let confiSet = [];

document.getElementById("selecciones").addEventListener("keydown", e => e.preventDefault());


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          else{
            $("#staticBackdrop").modal('show');
            saveConfig()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

async function onloadSet(){
    window.Bridge.cargarNameSettings()  
    
}

window.Bridge.cargarNS((event, nombres) => {
    nombresSet = nombres
    respaldo = document.getElementById("savedSettings").innerHTML
    codigo = respaldo
    for (var i = 0; i<nombresSet.length; i++){
        codigo += `<option value="${nombresSet[i].nombreconf}">${nombresSet[i].nombreconf}</option>` 
    }
    document.getElementById("savedSettings").innerHTML = codigo
})


function loadSet(element){
    opcion = element.value
    if (opcion == '0'){
        document.getElementById("saveSet").disabled = false
        document.getElementById("nameSetting").value = ""
        document.getElementById("nameSetting").disabled = false
        document.getElementById("termSele").checked = false
        document.getElementById("termSele").disabled = false
        document.getElementById("Sani").checked = false
        document.getElementById("Sani").disabled = false
        document.getElementById("Nani").checked = false
        document.getElementById("Nani").disabled = false
        document.getElementById("selecciones").value = ""
        document.getElementById("selecciones").disabled = false
        document.getElementById("termTiem").checked = false
        document.getElementById("termTiem").disabled = false
        document.getElementById("tiempo").disabled = false
        document.getElementById("tiempo").value = ""
        document.getElementById("bancoInicial").value = ""
        document.getElementById("bancoInicial").disabled = false

        document.getElementById("gananciaA").value = ""
        document.getElementById("gananciaA").disabled = false
        document.getElementById("perdidaA").value = ""
        document.getElementById("perdidaA").disabled = false

        document.getElementById("gananciaB").value = ""
        document.getElementById("gananciaB").disabled = false
        document.getElementById("perdidaB").value = ""
        document.getElementById("perdidaB").disabled = false

        document.getElementById("gananciaC").value = ""
        document.getElementById("gananciaC").disabled = false
        document.getElementById("perdidaC").value = ""
        document.getElementById("perdidaC").disabled = false

        document.getElementById("gananciaD").value = ""
        document.getElementById("gananciaD").disabled = false
        document.getElementById("perdidaD").value = ""
        document.getElementById("perdidaD").disabled = false

        document.getElementById("gananciaNA").value = ""
        document.getElementById("gananciaNA").disabled = false
        
        document.getElementById("gananciaNB").value = ""
        document.getElementById("gananciaNB").disabled = false
        
        document.getElementById("gananciaNC").value = ""
        document.getElementById("gananciaNC").disabled = false

        document.getElementById("gananciaND").value = ""
        document.getElementById("gananciaND").disabled = false
    }
    else{
        window.Bridge.loadSetting(opcion)
    }
}

window.Bridge.sendResponse((event, resp) =>{
    if (resp[0] == 0){
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var alertTrigger = document.getElementById('saveSet')

        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + 'danger' + ' alert-dismissible" role="alert">' + resp[1] + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
    else{
        // location.reload()
    }
})

async function cerrarConf(){
    location.reload()
}

window.Bridge.cargarSetting((event, confi) => {
    confiSet = confi
    document.getElementById("saveSet").disabled = true
    document.getElementById("nameSetting").value = confiSet[0]
    document.getElementById("nameSetting").disabled = true
    if (confiSet[16] == "1"){
        document.getElementById("termSele").checked = true
        document.getElementById("termSele").disabled = true
        document.getElementById("selecciones").value = confiSet[14]
        document.getElementById("selecciones").disabled = true
        document.getElementById("termTiem").disabled = true
        document.getElementById("tiempo").disabled = true

    }
    else if (confiSet[16] == "2"){
        document.getElementById("termTiem").checked = true
        document.getElementById("termTiem").disabled = true
        document.getElementById("tiempo").value = confiSet[13]
        document.getElementById("tiempo").disabled = true
        document.getElementById("termSele").disabled = true
        document.getElementById("selecciones").disabled = true
    }
    if (confiSet[17] == true){
        document.getElementById("Sani").checked = true
        document.getElementById("Sani").disabled = true
        document.getElementById("Nani").disabled = true
    }
    else{
        document.getElementById("Nani").checked = true
        document.getElementById("Nani").disabled = true
        document.getElementById("Sani").disabled = true
    }
    document.getElementById("bancoInicial").value = confiSet[15]
    document.getElementById("bancoInicial").disabled = true

    document.getElementById("gananciaA").value = confiSet[1]
    document.getElementById("gananciaA").disabled = true
    document.getElementById("perdidaA").value = confiSet[2]
    document.getElementById("perdidaA").disabled = true
    gananciaNS = confiSet[1].reduce(function(a, b){
        return a + b;
      });
    gananciaNP = confiSet[2].reduce(function(a, b){
        return a + b;
      });
    gananciaN = gananciaNS+gananciaNP
    document.getElementById("gananciaNA").value = gananciaN
    document.getElementById("gananciaNA").disabled = true

    gananciaNS = confiSet[3].reduce(function(a, b){
        return a + b;
      });
    gananciaNP = confiSet[4].reduce(function(a, b){
        return a + b;
      });
    gananciaN = gananciaNS+gananciaNP
    document.getElementById("gananciaNB").value = gananciaN
    document.getElementById("gananciaNB").disabled = true

    gananciaNS = confiSet[5].reduce(function(a, b){
        return a + b;
      });
    gananciaNP = confiSet[6].reduce(function(a, b){
        return a + b;
      });
    gananciaN = gananciaNS+gananciaNP
    document.getElementById("gananciaNC").value = gananciaN
    document.getElementById("gananciaNC").disabled = true

    gananciaNS = confiSet[7].reduce(function(a, b){
        return a + b;
      });
    gananciaNP = confiSet[8].reduce(function(a, b){
        return a + b;
      });
    gananciaN = gananciaNS+gananciaNP
    document.getElementById("gananciaND").value = gananciaN
    document.getElementById("gananciaND").disabled = true

    document.getElementById("gananciaB").value = confiSet[3]
    document.getElementById("gananciaB").disabled = true
    document.getElementById("perdidaB").value = confiSet[4]
    document.getElementById("perdidaB").disabled = true

    document.getElementById("gananciaC").value = confiSet[5]
    document.getElementById("gananciaC").disabled = true
    document.getElementById("perdidaC").value = confiSet[6]
    document.getElementById("perdidaC").disabled = true

    document.getElementById("gananciaD").value = confiSet[7]
    document.getElementById("gananciaD").disabled = true
    document.getElementById("perdidaD").value = confiSet[8]
    document.getElementById("perdidaD").disabled = true
    


})

async function saveConfig(){
    nombre = document.getElementById("nameSetting").value
    if (document.getElementById("termSele").checked == true){
        configFlag = "1"
        selecciones = document.getElementById("selecciones").value
        tiempo = null
    }
    else if (document.getElementById("termTiem").checked == true){
        configFlag = "2"
        tiempo = document.getElementById("tiempo").value
        selecciones = null
    }
    if (document.getElementById("Sani").checked == true){
        aniFlag = "1"
    }
    else if (document.getElementById("Nani").checked == true){
        aniFlag = "2"
    }
    bancoInicial = document.getElementById("bancoInicial").value
    gananciaA = document.getElementById("gananciaA").value
    gananciaA = iterar(gananciaA)
    gananciaB = document.getElementById("gananciaB").value
    gananciaB = iterar(gananciaB)
    gananciaC = document.getElementById("gananciaC").value
    gananciaC = iterar(gananciaC)
    gananciaD = document.getElementById("gananciaD").value
    gananciaD = iterar(gananciaD)
    perdidaA = document.getElementById("perdidaA").value
    perdidaA = iterar(perdidaA)
    perdidaB = document.getElementById("perdidaB").value
    perdidaB = iterar(perdidaB)
    perdidaC = document.getElementById("perdidaC").value
    perdidaC = iterar(perdidaC)
    perdidaD = document.getElementById("perdidaD").value
    perdidaD = iterar(perdidaD)
    configuracion = [nombre, gananciaA, perdidaA, gananciaB, perdidaB, gananciaC, perdidaC, gananciaD, perdidaD, selecciones, tiempo, bancoInicial, configFlag, aniFlag]
    console.log(aniFlag)
    await window.Bridge.saveSet(configuracion)
    
}

function iterar(arreglo){
    arreglificado = []
    aux = ""
    let aux2
    for(let i = 0; i< arreglo.length; i++){
        aux += arreglo[i]
        if (arreglo[i]==","){
            aux = aux.substring(0, aux.length-1)
            aux2 = parseInt(aux)
            arreglificado.push(aux2)
            aux=""
        }
        if (i==arreglo.length-1){
            aux2 = parseInt(aux)
            arreglificado.push(aux2)
            aux=""
        }
        /*if (arreglo[i] != ","){
            aux += arreglo[i]
        }
        else {
            aux2 = parseInt(aux)
            arreglificado.push(aux2)
            aux=""
        }*/
    }
    return arreglificado
}


async function term(element){
    termi = element.value;
    if (element.checked == true){
        if (termi==0){
            desact = document.getElementById("selecciones")
            desact.disabled = true;
            act = document.getElementById("tiempo")
            act.disabled = false;
            act.setAttribute('required', '')
        }
        else if (termi==1){
            desact = document.getElementById("tiempo")
            desact.disabled = true; 
            act = document.getElementById("selecciones")
            act.disabled = false;
            act.setAttribute('required', '')
        }
    }
}

function gananciaNeta(ganancia, perdida){
    arregloG = iterar(ganancia.value)
    gananciaNS = arregloG.reduce(function(a, b){
        return a + b;
      });
    arregloP = iterar(perdida.value)
    gananciaNP = arregloP.reduce(function(a, b){
        return a + b;
    });
    gananciaN = gananciaNS + gananciaNP
    return gananciaN
}
gA = document.getElementById("gananciaA");
pA = document.getElementById("perdidaA")
gB = document.getElementById("gananciaB");
pB = document.getElementById("perdidaB")
gC = document.getElementById("gananciaC");
pC = document.getElementById("perdidaC")
gD = document.getElementById("gananciaD");
pD = document.getElementById("perdidaD")
gA.addEventListener("input", ()=> {
    if(gA.validity.valid == true && pA.validity.valid == true){
        document.getElementById("gananciaNA").value = gananciaNeta(gA,pA)
        
    }
    else{

    }
});
pA.addEventListener("input", ()=> {
    if(gA.validity.valid == true && pA.validity.valid == true){
        document.getElementById("gananciaNA").value = gananciaNeta(gA,pA)
    }
    else{

    }
});
gB.addEventListener("input", ()=> {
    if(gB.validity.valid == true && pB.validity.valid == true){
        document.getElementById("gananciaNB").value = gananciaNeta(gB,pB)
    }
    else{

    }
});
pB.addEventListener("input", ()=> {
    if(gB.validity.valid == true && pB.validity.valid == true){
        document.getElementById("gananciaNB").value = gananciaNeta(gB,pB)
    }
    else{

    }
});
gC.addEventListener("input", ()=> {
    if(gC.validity.valid == true && pC.validity.valid == true){
        document.getElementById("gananciaNC").value = gananciaNeta(gC,pC)
    }
    else{

    }
});
pC.addEventListener("input", ()=> {
    if(gC.validity.valid == true && pC.validity.valid == true){
        document.getElementById("gananciaNC").value = gananciaNeta(gC,pC)
    }
    else{

    }
});
gD.addEventListener("input", ()=> {
    if(gD.validity.valid == true && pD.validity.valid == true){
        document.getElementById("gananciaND").value = gananciaNeta(gD,pD)
    }
    else{

    }
});
pD.addEventListener("input", ()=> {
    if(gD.validity.valid == true && pD.validity.valid == true){
        document.getElementById("gananciaND").value = gananciaNeta(gD,pD)
    }
    else{

    }
});
