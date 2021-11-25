function consultarClientes(){
	$.ajax({    
    url : 'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
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
	        miTabla += '<td>'+ respuesta.items[i].name + '</td>'; 
			miTabla += '<td>'+ respuesta.items[i].email + '</td>';		
	        miTabla += '<td>'+ respuesta.items[i].age + '</td>'; 
			miTabla += '<td> <input type="button" onclick="cargarCliente(' + respuesta.items[i].id + ')" title="Seleccionar" value="Seleccionar"> </td>';				
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

function buscarCliente(){
    let idCliente = document.getElementById("idCliente").value;
    $.ajax({
        type: "GET",
        url: "https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/" + idCliente,
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
                miTabla += '<td>'+ respuesta.items[i].name + '</td>'; 
                miTabla += '<td>'+ respuesta.items[i].email + '</td>';		
                miTabla += '<td>'+ respuesta.items[i].age + '</td>'; 
                miTabla += '<td> <input type="button" onclick="cargarCliente(' + respuesta.items[i].id + ')" title="Seleccionar" value="Seleccionar"> </td>';				
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
function guardarCliente(){
	let misDatos = {
        id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),
		age: $("#age").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("¡Cliente guardado!");
			borrarDatos();
        	consultarClientes();	
			}
		}
	});
}

function cargarCliente(id) {
    $.ajax({
        type: "GET",
        url: "https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client/" + id,
        data: "{}",
        dataType: "JSON",
        success: function(response) {
            console.log(response.items[0]);
            $('#id').val(response.items[0].id) //.attr('readonly', true);
            $('#name').val(response.items[0].name);
            $('#email').val(response.items[0].email);
            $('#age').val(response.items[0].age);
        }
    });
}
function editarCliente(){
    let myData={
        id:$("#id").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val()
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarClientes();
            alert("¡Los datos del cliente se han actualizado!")
        }
    });
}
function borrarDatos(){
    $("#resultado").empty();
    $("#id").val("");
    $("#name").val("");
    $("#email").val("");
    $("#age").val("");
}
function borrarCliente(){
    let idCli = document.getElementById("id").value;
    let myData={
        id:idCli
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"https://gf3783ba5adcec8-db202109230804.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/client/client",
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            borrarDatos();
            consultarClientes();
            alert("¡Cliente Eliminado!")
        }
    });
}
