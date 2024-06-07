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
            saveSuje()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

let id

async function onloadModi(){
  window.Bridge.cargarModi()
}
async function saveSuje(){
    nombre = document.getElementById('nameSetting').value
    apellido = document.getElementById('apeSetting').value
    fechanac = document.getElementById('fechaSetting').value
    escolaridad = document.getElementById('escoSettings').value
    sexo = document.getElementById('sexSettings').value
    tel = document.getElementById('telSetting').value
    datos = [id, nombre, apellido, fechanac, escolaridad, sexo, tel]
    console.log(datos)
    await window.Bridge.modSuj2(datos)
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

window.Bridge.listo((event, messages) =>{
  console.log(messages)
  id = messages[0]["id_participante"]
  document.getElementById("nameSetting").value = messages[0]["nombre"]
  document.getElementById("apeSetting").value = messages[0]["apellidos"]
  document.getElementById("fechaSetting").value = messages[0]["fechanac"]
  document.getElementById("escoSettings").value = messages[0]["escolaridad"]
  document.getElementById("sexSettings").value = messages[0]["sexo"]
  document.getElementById("telSetting").value = messages[0]["telefono"]
})