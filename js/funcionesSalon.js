function consultarSalones(){
	$.ajax({    
    url : 'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	data: "{}",
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultado").empty();
        let miTabla = '<table>';
		for (i=0; i<respuesta.items.length; i++){
			miTabla += '<tr>';
	        miTabla += '<td>'+ respuesta.items[i].id + '</td>'; 		
	        miTabla += '<td>'+ respuesta.items[i].owner + '</td>'; 
			miTabla += '<td>'+ respuesta.items[i].capacity + '</td>';		
	        miTabla += '<td>'+ respuesta.items[i].category_id + '</td>'; 
            miTabla += '<td>'+ respuesta.items[i].name + '</td>';
			miTabla += '<td> <input type="button" onclick="cargarSalon(' + respuesta.items[i].id + ')" title="Seleccionar" value="Seleccionar"> </td>';				
			miTabla += '</tr>';
	
		}
        miTabla += '</table>';
	    $("#resultado").append(miTabla);    

	},
    error : function(xhr, status) {
        alert('Ha sucedido un problema: '+ status);
    }
});
}

function buscarSalon(){
    let idSalon = document.getElementById("idSalon").value;
    $.ajax({
        type: "GET",
        url: "https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/" + idSalon,
        data: "{}",
        type : 'GET',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
        success : function(respuesta) {
            console.log(respuesta);
            $("#resultado").empty();
            let miTabla = '<table>';
		    for (i=0; i<respuesta.items.length; i++){
                miTabla += '<tr>';
                miTabla += '<td>'+ respuesta.items[i].id + '</td>'; 		
                miTabla += '<td>'+ respuesta.items[i].owner + '</td>'; 
                miTabla += '<td>'+ respuesta.items[i].capacity + '</td>';		
                miTabla += '<td>'+ respuesta.items[i].category_id + '</td>'; 
                miTabla += '<td>'+ respuesta.items[i].name + '</td>';
                miTabla += '<td> <input type="button" onclick="cargarSalon(' + respuesta.items[i].id + ')" title="Seleccionar" value="Seleccionar"> </td>';				
                miTabla += '</tr>';
	
		    }
            miTabla += '</table>';
            $("#resultado").append(miTabla);    
    
        },
        error : function(xhr, status) {
            alert('Ha sucedido un problema: '+ status);
        }
    });
    
}
function guardarSalon(){
	let misDatos = {
        id: $("#id").val(),
        owner: $("#owner").val(),
        capacity: $("#capacity").val(),
		category_id: $("#category_id").val(),
        name: $("#name").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("¡Salon guardado!");
			borrarDatos();
        	consultarSalones();	
			}
		}
	});
}

function cargarSalon(id) {
    $.ajax({
        type: "GET",
        url: "https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom/" + id,
        data: "{}",
        dataType: "JSON",
        success: function(response) {
            console.log(response.items[0]);
            $('#id').val(response.items[0].id);
            $('#owner').val(response.items[0].owner);
            $('#capacity').val(response.items[0].capacity);
            $('#category_id').val(response.items[0].category_id);
            $('#name').val(response.items[0].name);
        }
    });
}
function editarSalon(){
    let myData={
        id:$("#id").val(),
        owner:$("#owner").val(),
        capacity:$("#capacity").val(),
        category_id:$("#category_id").val(),
        name:$("#name").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarSalones();
            alert("¡Los datos del salon se han actualizado!")
        }
    });
}
function borrarDatos(){
    $("#resultado").empty();
    $("#id").val("");
    $("#owner").val("");
    $("#capacity").val("");
    $("#category_id").val("");
    $("#name").val("");
}
function borrarSalon(){
    let idSal = document.getElementById("id").value;
    let myData={
        id:idSal
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/partyroom/partyroom",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarSalones();
            alert("¡Salon Eliminado!")
        }
    });
}