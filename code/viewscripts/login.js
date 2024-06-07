let modalContLogin = 0;
function seleccionarLogin(){
    user = document.getElementById("inputUser").value
    password = document.getElementById("inputPassword").value
    let credenciales = []
    credenciales.push(user)
    credenciales.push(password)
    window.Bridge.enviarCredenciales(credenciales);
    
}


window.Bridge.loginCorrecto((event, respuesta)=>{
    if (respuesta.length == 0){
        window.location.href = "../views/login.html";
        console.log("Bebecita")
    }
    else {
        window.location.href = "../views/perfil.html";
        console.log("Bebecita corr")
    }
})

$(document).ready(function(){
    console.log("PESMFWIOPEMNFPO")
    window.Bridge.enviarSeñal();
    window.Bridge.probarBase();
})

window.Bridge.nodal((event, modalCont)=>{
    modalContLogin = modalCont
    console.log("ModalCont", modalContLogin)
    if (modalContLogin == 1){
        console.log("OSINFOIWEN")
        $("#staticBackdrop").modal('show');
    }
    else {
        $("#staticBackdrop").modal('hide');
    }
})

window.Bridge.restore((event, messages) =>{
    console.log(messages)
    if (messages == '2'){
            document.getElementById('texto').style.textAlign = "left"
            document.getElementById('carga').src=''
            document.getElementById("staticBackdropLabel").innerHTML = "Error"
            document.getElementById("boton").disabled = false
            // document.getElementById("texto").innerHTML = "Ocurrió un error con la conexión a la base de datos, intenta verificar si el túnel fue establecido correctamente y vuelve a ejecutar el programa."
            document.getElementById("texto").innerHTML = "There was an error while trying to establish a connection with the database"
    }
    else{
            document.getElementById('texto').style.textAlign = "left"
            document.getElementById('carga').src=''
            document.getElementById("staticBackdropLabel").innerHTML = "Connection successful"
            document.getElementById("texto").innerHTML = 'Success'
            document.getElementById("boton").disabled = false
        }   
});