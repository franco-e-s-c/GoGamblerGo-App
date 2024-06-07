

let id
async function delExp(){
    var filasSeleccionadas = table.rows(".selected").data();
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
        document.getElementById("texto").innerHTML = "Select subjects"
        $("#staticBackdrop").modal('show');
        // alert("Selecciona un valor de Cross Validation menor a la cantidad de usuarios por clase")
        return
    }
    param={
        "id": id2
    }
    param = JSON.stringify(param)
    console.log("IDDDD", id2)
    await window.Bridge.delExp(id2);
}

window.Bridge.listo((event, messages) =>{
    if (messages == true){
        document.getElementById("staticBackdropLabel").innerHTML = "Success"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = "Game deleted"  
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

async function resetear(){
    $("#min").val('');
    $("#max").val('');
    initializeMinMax();
    table.draw();
    table.searchPanes.clearSelections()
}

async function initializeMinMax(){
    minDate = new DateTime(document.getElementById("minA"), {
        format: 'YYYY-MM-DD'
    });
    maxDate = new DateTime('#maxA', {
        format: 'YYYY-MM-DD'
    });
}


window.Bridge.cargarAnalisis((event, analisis) => {
    cuestionarioTable = $('#cuestionario').DataTable({
        show: true,
        "pageLength": 50,
        "columnDefs":[
            {
                width: "9%",
                targets: 0
            },
            {
                width: "9%",
                targets: 2
            }
        ],
        ordering: false,
            "language": {
                "emptyTable": "Select a Participant"
            },
        dom:
            
            "<'col-12 mt-3 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" 
    })
    table = $('#example').DataTable({
        "pageLength": 50,
        "data": analisis,
        "columns": [
            {"data": "id_exp"},
            {"data": "id_participante"},
            {"data": "nombre_completo"},
            {"data": "fecha"},
            {"data": "edad"},
            {"data": "telefono"},
            {"data": "escolaridad"},
            {"data": "sexo"},
            {"data": "nombreconf"}
        ],
        columnDefs: [
            {
                targets: [2,5],
                visible: true,
                data: null,
                defaultContent: '*********'
            }
        ],
        searchPanes: {
            show: true,
            columns: [6,7,8],
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
            targets: [6,7,8]
        }],
        dom:
        "P"+
        "<'toolbar'>"+
		"<'row justify-content-between mb-3'<'col-4 d-flex justify-content-start'f><'col-4 d-flex justify-content-end'l>>" +
        "<'col-12 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        
    });
    document.querySelector('div.toolbar').innerHTML = `<div class="row justify-content-start">
    <div class="col-6">
    <label for="">Application date</label>
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
//     document.querySelector('div.toolbar').innerHTML = `<div class="row justify-content-start">
//     <div class="col-6">
//         <label for="">Application date</label>
//     </div>
//     <div class="col-6">
//     <label for="">Date of birth</label>
// </div>
//     </div>
// <div class="row justify-content-start">
// <div class="col-2">
//     <label for="min">From: </label>
// </div>
// <div class="col-4">
//     <label for="max">To: </label>
// </div>
// <div class="col-2">
//     <label for="minA">From: </label>
// </div>
// <div class="col-2">
//     <label for="maxA">To: </label>
// </div>
// </div>
// <div class="row justify-content-start mb-2">
//     <div class="col-2">
//         <input class="form-control" type="text" id="min" name="min">
//     </div>
//     <div class="col-2">
//         <input class="form-control" type="text" id="max" name="max">
//     </div>
//     <div class="col-2">
//         <button id="buttonR1" type="button" class="btn btn-primary" onclick="resetear()">Reset Filter</button>
//     </div>
//     <div class="col-2">
//         <input class="form-control" type="text" id="minA" name="minA">
//     </div>
//     <div class="col-2">
//         <input class="form-control" type="text" id="maxA" name="maxA">
//     </div>
//     <div class="col-2">
//         <button id="buttonR2" type="button" class="btn btn-primary" onclick="resetear2()">Reset Filter</button>
//     </div>
// </div>`

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
        
    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            //$(this).removeClass('selected');
            /*datos = table.row(".selected").data()
            console.log(datos)*/
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            datos = table.row(".selected").data()
            id = datos["id_participante"]
            console.log("bbbbbbb")
            resultados(datos)
        }
    });

    table.on('draw.dt', function () {
        quitarSeleccion();
    })
    function quitarSeleccion() {
        console.log("QUITAAARRRRRRR")
        table.rows().deselect(); 
        cuestionarioTable.clear().draw()
    }
})

 
// Custom filtering function which will search data in column four between two values
// let minEl, maxEl
// DataTable.ext.search.push(function (settings, data, dataIndex) {
//     var min = parseInt(minEl.value, 10);
//     var max = parseInt(maxEl.value, 10);
//     var age = parseFloat(data[4]) || 0; // use data for the age column
 
//     if (
//         (isNaN(min) && isNaN(max)) ||
//         (isNaN(min) && age <= max) ||
//         (min <= age && isNaN(max)) ||
//         (min <= age && age <= max)
//     ) {
//         return true;
//     }
 
//     return false;
// });



// document.querySelectorAll('#minA, #maxA').forEach((el) => {
//     el.addEventListener('change', () => table.draw());
// });

window.Bridge.cargarResultados((event, result)=>{
    cuestionarioTable.destroy()
    console.log(result)
    cuestionarioTable= $('#cuestionario').DataTable({
        "pageLength": 500,
        ordering: false,
        "data": result,
        "columns": [
            {"data": "iteracion"},
            {"data": "tinicio"},
            {"data": "tclic"},
            {"data": "tretroalimentacion"},
            {"data": "tfinretro"},
            {"data": "tintervalo"},
            {"data": "seleccion"},
            {"data": "ganancia"},
            {"data": "perdida"},
            {"data": "total"}
        ],
        dom:
		
		"<'col-12 mt-3 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" ,

    })
})

async function resultados(datos){
    await window.Bridge.getResultados(datos["id_exp"])
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
    await window.Bridge.getAnalisis();
});