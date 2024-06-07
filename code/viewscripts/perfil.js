/*(function () {
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
            checkPass()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()*/

async function onloadPro(){
  window.Bridge.cargarPro()
}

function salir(){
  window.Bridge.reset()
  window.location.href = "../login.html"
}

window.Bridge.getPro((event,resp)=>{
  document.getElementById("user").value = resp[0].usuario
})

function checkPass(){
    pass = document.getElementById("passModal").value
    window.Bridge.confirmPass(pass)
}

function updateData(){
  if(document.getElementById("pass").value == "" || document.getElementById("user").value == ""){
    return
  }
  else{
    let datosNuevos = []
    datosNuevos.push(document.getElementById("user").value)
    datosNuevos.push(document.getElementById("pass").value)
    window.Bridge.enviarDatosnuevos(datosNuevos);
    window.location.href = "../views/perfil.html";
  }
}

/*$('#cerrar').click(function(){
    res=false
    if(res==true){
        document.getElementById("user").disabled = false
        document.getElementById("pass").disabled = false
        document.getElementById("email").disabled = false
        document.getElementById("actionBtn").innerHTML = "Guardar"
        document.getElementById("actionBtn").setAttribute("data-bs-target", " ")
        $('#exampleModal').modal('hide');
    }
})*/

window.Bridge.resultPass((event, flag) =>{
    if (flag == true){
        document.getElementById("user").disabled = false
        document.getElementById("pass").disabled = false
        document.getElementById("actionBtn").innerHTML = "Save"
        document.getElementById("actionBtn").setAttribute("data-bs-target", "#errorModal")
        $('#exampleModal').modal('hide');
    }
    else{
        document.getElementById("passModal").classList.add("is-invalid")
    }
})