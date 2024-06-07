
id = []
function abrir(){
    window.Bridge.abrirEx()
}

async function sacarDat(){
    var filasSeleccionadas = table.rows({ selected: true }).data();
    console.log("tipo de:", typeof(filasSeleccionadas))
    console.log(filasSeleccionadas.toArray())
    console.log("tipo de:", typeof(filasSeleccionadas))
    filasSeleccionadas = filasSeleccionadas.toArray()
    console.log("filasselccionadas: ", filasSeleccionadas)
    for(let i=0; i<=filasSeleccionadas.length-1;i++){
        console.log(filasSeleccionadas[i]["id_participante"])
        id.push(filasSeleccionadas[i]["id_exp"])
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
    generar2(param)
}

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
    // document.querySelector('div.toolbar').innerHTML = '<div class="col-3 my-auto"><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="selectAll2"> <label class="form-check-label" for="selectAll">Select All</label></div></div>';

    table = $('#example').DataTable({
        select: {
            style: 'multi'
        },
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
        "<'#date'>"+
		"<'row justify-content-between mb-3'<'col-4 d-flex justify-content-start'f><'col-4 d-flex justify-content-end'l>>" +
        "<'#all'>"+
		"<'col-12 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        
    });
    document.getElementById('all').innerHTML = '<div class="col-3 my-auto"><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="selectAll"> <label class="form-check-label" for="selectAll">Select All</label></div></div>';
    document.getElementById("date").innerHTML = `<div class="row justify-content-start">
    <div class="col-6">
    <label for="">Application Date</label>
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

// minEl = new DateTime(document.getElementById("minA"), {
//     format: 'YYYY-MM-DD'
// });
// maxEl = new DateTime('#maxA', {
//     format: 'YYYY-MM-DD'
// });

// document.querySelectorAll('#minA, #maxA').forEach((el) => {
//     el.addEventListener('change', () => table.draw());
// });

// DataTable.ext.search.push(function (settings, data, dataIndex) {
//     if(settings.nTable.id !== 'example'){
//         return true
//     }
//     let minA = moment($('#minA').val(), 'YYYY-MM-DD', true).isValid() ?
//             moment($('#minA').val(), 'YYYY-MM-DD', true).unix() :
//             null;
        
//          let maxA = moment($('#maxA').val(), 'YYYY-MM-DD').isValid() ?
//              moment( $('#maxA').val(), 'YYYY-MM-DD', true ).unix():
//              null;
//         var date = moment( data[4], 'YYYY-MM-DD', true ).unix();
      
//       console.log("minA: " + minA + ' ' + $('#minA').val())
//       console.log($('#minA').val() + ": " + moment($('#minA').val(), 'YYYY-MM-DD', true).isValid())
//       console.log("maxA: " + maxA + ' ' + $('#minA').val())

//         if (
//             ( min === null && maxA === null ) ||
//             ( min === null && date <= maxA ) ||
//             ( min <= date   && maxA === null ) ||
//             ( min <= date   && date <= maxA )
//         ) {
//             return true;
//         }
//         return false;
// });

    $("#selectAll").on( "click", function(e) {
        if ($(this).is( ":checked" )) {
        table.rows({page:'current'}  ).select();        
        } else {
        table.rows({page:'current'}  ).deselect(); 
        }
    });
    table.on('draw.dt', function () {
        quitarSeleccion();
    });

    function quitarSeleccion() {
        table.rows().deselect(); 
        document.getElementById('selectAll').checked = false
    }
    // $('#example tbody').on('click', 'tr', function () {
    //     if ($(this).hasClass('selected')) {
    //         //$(this).removeClass('selected');
    //         /*datos = table.row(".selected").data()
    //         console.log(datos)*/
    //     } else {
    //         table.$('tr.selected').removeClass('selected');
    //         $(this).addClass('selected');
    //         datos = table.row(".selected").data()
    //         generar(datos)
    //     }
    // });
})


// async function generar(datos){
//     await window.Bridge.uExcel(datos["id_exp"])
// }

async function generar2(datos){
    await window.Bridge.uExcel2(datos)
}

// async function todos(){
//     await window.Bridge.usExcel()
// }

window.Bridge.listo((event, messages) =>{
    console.log(messages)
    if (messages[0] == '0'){
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Success"
        document.getElementById("boton").disabled = false
        document.getElementById("texto").innerHTML = "Files saved successfully"  
        
    }
    else if (messages[0]=='1'){
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Error"
        document.getElementById("boton").disabled = false
        // document.getElementById("texto").innerHTML = 'Export error'
        document.getElementById("texto").innerHTML = messages
    }
    else {
        var mensaje = messages[1]
        document.getElementById("staticBackdropLabel").innerHTML = "Waiting for response"
        document.getElementById("boton").disabled = false
    }
})

$(document).ready(async function () {
    await window.Bridge.getAnalisis();
});