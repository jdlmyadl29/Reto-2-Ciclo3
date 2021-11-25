function consultarMensajes(){
	$.ajax({    
    url : 'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
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
	        miTabla += '<td>'+ respuesta.items[i].messagetext + '</td>'; 
			miTabla += '<td> <input type="button" onclick="cargarMensaje(' + respuesta.items[i].id + ')" title="Seleccionar" value="Seleccionar"> </td>';				
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

function guardarMensaje(){
	let misDatos = {
        id: $("#id").val(),
        messagetext: $("#messageText").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("¡Mensaje guardado!");
			borrarDatos();
        	consultarMensajes();	
			}
		}
	});
}

function cargarMensaje(id) {
    $.ajax({
        type: "GET",
        url: "https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message/" + id,
        data: "{}",
        dataType: "JSON",
        success: function(response) {
            console.log(response.items[0]);
            $('#id').val(response.items[0].id) //.attr('readonly', true);
            $('#messageText').val(response.items[0].messagetext);
        }
    });
}
function editarMensaje(){
    let myData={
        id:$("#id").val(),
        messagetext:$("#messageText").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarMensajes();
            alert("¡Mensaje actualizado!")
        }
    });
}
function borrarDatos(){
    $("#resultado").empty();
    $("#id").val("");
    $("#messageText").val("");
}
function borrarMensaje(){
    let idMsn = document.getElementById("id").value;
    let myData={
        id:idMsn
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/message/message",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarMensajes();
            alert("¡Mensaje Eliminado!")
        }
    });
}