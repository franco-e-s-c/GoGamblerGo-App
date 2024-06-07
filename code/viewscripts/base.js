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
            avanzar()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()



function avanzar(){
    user = document.getElementById("inputUser").value
    host = document.getElementById("inputHost").value
    pass = document.getElementById("inputPass").value
    port = document.getElementById("inputPort").value
    data = document.getElementById("inputData").value
    cred = [user, host, data, pass, port]
    window.Bridge.sendCred(cred)
}

window.Bridge.listo((event, messages) =>{
    console.log(messages)
    if (messages[0] == '0'){
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Success"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = "Database data updated"  
    }
    else if (messages[0]=='1'){
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Error"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = 'Error'
    }
    else {
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Waiting for response"
        document.getElementById("boton").disabled = false
    }
})