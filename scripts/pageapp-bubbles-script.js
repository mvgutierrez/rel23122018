function validate(){
	var mensaje = document.getElementById("mensaje").value;
	if((mensaje == "") || (mensaje==" ")){
		document.getElementById("cerrar").click();	
		setTimeout(function() { document.getElementById("alertMessage").innerHTML = "Debe escribir su mensaje."; $('.simple-modal-content').modal();}, 1000);
	}
	else{
		var usuario = getParameterByName('usuario');

		var postData = {"usuario" : usuario,
						"mensaje" : mensaje}};
						
		$.ajax({
		type: "POST",
		url: URL + "/mensajeNuevo.php",
		data: postData, 
		success: function(data){
			document.getElementById("mensaje").value = "";
			document.getElementById("cerrar").click();
			if(data == "No es posible enviar el mensaje, verifique su conexión a internet."){
				setTimeout(function() { document.getElementById("alertMessage").innerHTML = data; $('.simple-modal-content').modal();}, 1000);
			}	
		},
		error: function(data){
			document.getElementById("cerrar").click();	
			setTimeout(function() { document.getElementById("alertMessage").innerHTML = "No es posible enviar el mensaje, verifique su conexión a internet."; $('.simple-modal-content').modal();}, 1000);
		}
		});
}