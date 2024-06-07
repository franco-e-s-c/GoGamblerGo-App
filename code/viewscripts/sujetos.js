
id=[]

async function resetear(){
    $("#min").val('');
    $("#max").val('');
    initializeMinMax();
    table.draw();
    table.searchPanes.clearSelections()
}

async function initializeMinMax(){
    minEl = new DateTime(document.getElementById("minA"), {
        format: 'YYYY-MM-DD'
    });
    maxEl = new DateTime('#maxA', {
        format: 'YYYY-MM-DD'
    });
}
window.Bridge.cargarSujetos((event, sujetos) => {
    table = $('#example').DataTable({
        select: {
            style: 'multi'
        },
        "pageLength": 1000,
        "data": sujetos,
        "columns": [
            {"data": "id_participante"},
            {"data": "nombre_completo"},
            {"data": "edad"},
            {"data": "telefono"},
            {"data": "escolaridad"},
            {"data": "sexo"},
            {"data": "expterminado"}
        ],
        searchPanes: {
            show: true,
            columns: [4,5,6],
            layout: 'columns-7',
            controls: false,
            cascadePanes: false,
            collapse: false,
            clear: false,
            header: ''
        },
        columnDefs: [
            {
            searchPanes: {
                show: true,
                viewTotal: false,
                viewCount: false,
                orderable: false,
                dtOpts: {
                    info: true,
                    searching: false,
                    autoWidth: true,
                },
                /*options:[
                    {
                        label: 'Neurotipico',
                        value: function(rowData, rowIdx){
                            return rowData[6] == 'Si';
                        }
                    },
                    {
                        label: 'No neurotipico',
                        value: function(rowData, rowIdx){
                            return rowData[6] == 'No';
                        }
                    },
                    {
                        label: 'Null',
                        value: function(rowData, rowIdx){
                            return rowData[6] !== null;
                        }
                    }
                ]*/
            },
            targets: [4,5,6]
        },
        {
            targets: [1,3],
            visible: true,
            data: null,
            defaultContent: '*********'
        },
        {
            targets: [6],
            visible: true,
            defaultContent: 'Pendiente'
        }
        ],
        dom:
        "P"+
        "<'#date'>"+
		"<'row justify-content-between mb-3'<'col-4 d-flex justify-content-start'f><'col-4 d-flex justify-content-end'l>>" +
        "<'#all'>"+
		"<'col-12 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    });
    document.getElementById('all').innerHTML = '<div class="col-3 my-auto"><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="selectAll"> <label class="form-check-label" for="selectAll">Select All</label></div></div>';
    document.getElementById('date').innerHTML = `<div class="row justify-content-start">
    <div class="col-6">
    <label for="">Date of birth</label>
</div>
    </div>
<div class="row justify-content-start">
<div class="col-2">
    <label for="min">From: </label>
</div>
<div class="col-4">
    <label for="max">To: </label>
</div>
</div>
<div class="row justify-content-start mb-2">
    <div class="col-2">
        <input class="form-control" type="text" id="min" name="min">
    </div>
    <div class="col-2">
        <input class="form-control" type="text" id="max" name="max">
    </div>
    <div class="col-2">
        <button id="buttonR1" type="button" class="btn btn-primary" onclick="resetear()">Reset Filters</button>
    </div>
</div>`
minDate = new DateTime(document.getElementById("min"), {
    format: 'YYYY-MM-DD'
});
maxDate = new DateTime('#max', {
    format: 'YYYY-MM-DD'
});

document.querySelectorAll('#min, #max').forEach((el) => {
    console.log("AAAA")
    el.addEventListener('change', () => table.draw());
});

DataTable.ext.search.push(function (settings, data, dataIndex) {
    if(settings.nTable.id !== 'example'){
        return true
    }
    let min = moment($('#min').val(), 'YYYY-MM-DD', true).isValid() ?
            moment($('#min').val(), 'YYYY-MM-DD', true).unix() :
            null;
        
    let max = moment($('#max').val(), 'YYYY-MM-DD').isValid() ?
            moment( $('#max').val(), 'YYYY-MM-DD', true ).unix():
            null;
    var date = moment( data[3], 'YYYY-MM-DD', true ).unix();
    
    console.log("min: " + min + ' ' + $('#min').val())
    console.log($('#min').val() + ": " + moment($('#min').val(), 'YYYY-MM-DD', true).isValid())
    console.log("max: " + max + ' ' + $('#max').val())

    if (
        ( min === null && max === null ) ||
        ( min === null && date <= max ) ||
        ( min <= date   && max === null ) ||
        ( min <= date   && date <= max )
    ) {
        return true;
    }
    return false;
});

    table.on('select', function () {
        var numFil = table.rows({selected:true}).data().length
        if (numFil == 1){
            document.getElementById("buttonM").disabled = false
            sacarDat2()
        }
        else{
            document.getElementById("buttonM").disabled = true
        }
        console.log(numFil)
    });
    table.on('deselect', function(){
        var numFil = table.rows({selected:true}).data().length
        if (numFil == 1){
            document.getElementById("buttonM").disabled = false
            sacarDat2()
        }
        else{
            document.getElementById("buttonM").disabled = true
        }
        console.log(numFil)
    });
    $("#selectAll").on( "click", function(e) {
        if ($(this).is( ":checked" )) {
        table.rows({page:'current'}  ).select();        
        } else {
        table.rows({page:'current'}  ).deselect(); 
        }
    });
    table.on('draw.dt', function () {
        quitarSeleccion();
    })
    function quitarSeleccion() {
        table.rows().deselect(); 
        document.getElementById('selectAll').checked = false
    }
})


document.querySelectorAll('#min, #max').forEach((el) => {
    el.addEventListener('change', () => table.draw());
});

window.Bridge.listo((event, messages) =>{
    if (messages == true){
        document.getElementById("staticBackdropLabel").innerHTML = "Success"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = "Subjects deleted"  
    }
    else if (messages== false){
        document.getElementById("staticBackdropLabel").innerHTML = "Error"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = 'Error at deletion'
    }
    else {
        document.getElementById("staticBackdropLabel").innerHTML = "Waiting for response"
        document.getElementById("boton").disabled = false
    }
})

async function sacarDat(){
    var filasSeleccionadas = table.rows({ selected: true }).data();
    console.log("tipo de:", typeof(filasSeleccionadas))
    console.log(filasSeleccionadas.toArray())
    console.log("tipo de:", typeof(filasSeleccionadas))
    filasSeleccionadas = filasSeleccionadas.toArray()
    console.log("filasselccionadas: ", filasSeleccionadas)
    for(let i=0; i<=filasSeleccionadas.length-1;i++){
        console.log(filasSeleccionadas[i]["id_participante"])
        id.push(filasSeleccionadas[i]["id_participante"])
    }
    if(filasSeleccionadas.length == 0){
        flag = 1
        alertShown =  true
        document.getElementById("boton").disabled = false
        document.getElementById("statickBackdropLabel").innerHTML = "Error"
        document.getElementById("texto").innerHTML = "Select subjects"
        $("#staticBackdrop").modal('show');
        // alert("Selecciona un valor de Cross Validation menor a la cantidad de usuarios por clase")
        return
    }
    param={
        "id": id
    }
    param = JSON.stringify(param)
    console.log("IDDDD", id)
    await window.Bridge.delSuj(id)
}

async function sacarDat2(){
    var filasSeleccionadas = table.rows({ selected: true }).data();
    console.log("tipo de:", typeof(filasSeleccionadas))
    console.log(filasSeleccionadas.toArray())
    console.log("tipo de:", typeof(filasSeleccionadas))
    filasSeleccionadas = filasSeleccionadas.toArray()
    console.log("filasselccionadas: ", filasSeleccionadas)
    for(let i=0; i<=filasSeleccionadas.length-1;i++){
        console.log(filasSeleccionadas[i]["id_participante"])
        var id2 = (filasSeleccionadas[i]["id_participante"])
    }
    if(filasSeleccionadas.length == 0){
        flag = 1
        alertShown =  true
        document.getElementById("boton").disabled = false
        document.getElementById("staticBackdropLabel").innerHTML = "Error"
        document.getElementById("texto").innerHTML = "Select sujetos"
        $("#staticBackdrop").modal('show');
        // alert("Selecciona un valor de Cross Validation menor a la cantidad de usuarios por clase")
        return
    }
    param={
        "id": id2
    }
    param = JSON.stringify(param)
    console.log("IDDDD", id2)
    await window.Bridge.modSuj(id2)
}






$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap5",
	sFilterInput:  "form-control form-control",
	sLengthSelect: "form-select form-select",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );
$.extend( true, DataTable.defaults, {
	dom:
		"<'row justify-content-between mb-3'<'col-4 d-flex justify-content-start'f><'col-4 d-flex justify-content-end'l>>" +
		"<'col-12 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );
$(document).ready(async function () {
    await window.Bridge.getSujetos();
});