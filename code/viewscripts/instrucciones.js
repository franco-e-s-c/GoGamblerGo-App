async function guardarExpe(){
    window.Bridge.guardarExp()
}

window.Bridge.sendResponse((event,resp)=>{
    if (resp[0] == 0){
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var alertTrigger = document.getElementById('saveExp')

        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + 'danger' + ' alert-dismissible" role="alert">' + resp[1] + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
        alertPlaceholder.append(wrapper)
    }
    else{
        window.location.href = 'igt.html'
    }
})