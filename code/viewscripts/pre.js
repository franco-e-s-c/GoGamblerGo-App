selecc = 0

async function onloadSet(){
    window.Bridge.cargarNameSettings()     
}

function loadSet(element){
    opcion = element.value
    if((element.value !="0")&&(selecc==1)){
        document.getElementById("linkB").style.pointerEvents = "all"
        document.getElementById("buttonB").disabled = false
    }
    else{
        document.getElementById("linkB").style.pointerEvents = "none"
        document.getElementById("buttonB").disabled = true
    }
    window.Bridge.loadSetting(opcion)
    
    
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

window.Bridge.cargarSujetos((event, sujetos) => {
    table = $('#example').DataTable({
        "data": sujetos,

        "columns": [
            {"data": "id_participante"},
            {"data": "nombre_completo"},
            {"data": "edad"},
            {"data": "telefono"},
            {"data": "escolaridad"},
            {"data": "sexo"}
        ],
        searchPanes: {
            show: true,
            columns: [5],
            layout: 'columns-7',
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
                    autoWidth: false,
                }
                /*options:[
                    {
                        label: 'Neurotipico',
                        value: function(rowData, rowIdx){
                            return rowData[9] !== false;
                        }
                    },
                    {
                        label: 'No neurotipico',
                        value: function(rowData, rowIdx){
                            return rowData[9] !== true;
                        }
                    }
                ],*/
            },
            targets: [5],
        },
        {
            targets: [1,3],
            visible: true,
            data: null,
            defaultContent: '*********'
        }
        ],
        dom:
        "P"+
		"<'row justify-content-between mb-3'<'col-4 d-flex justify-content-start'f><'col-4 d-flex justify-content-end'l>>" +
		"<'col-12 mb-3 tabla'<'row dt-row'<'col-sm-12'tr>>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        /*"fnDrawCallback": function(oSettings) {
            //$('#configS').prependTo($('#example_wrapper'));
            const collection = document.getElementsByClassName("dtsp-searchPanes");
            console.log("cjseio", collection)
            console.log("cjseio", collection[0])
            const colle = $('.dtsp-searchPanes')
            console.log("iunqiw", colle[0])
            $('#configS').prependTo(collection);
        },*/
        
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
            if(datos["id_participante"]!= null){
                selecc = 1
            }
            if(document.getElementById("savedSettings").value!="0" && datos["id_participante"]!= null){
                document.getElementById("linkB").style.pointerEvents = "all"
                document.getElementById("buttonB").disabled = false
            }
            sujeto(datos)
        }
    });
})

async function sujeto(datos){
    await window.Bridge.sendSujeto(datos["id_participante"])
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
    await window.Bridge.getSujetosPre();
});