function validate(){
	var nombre = document.getElementById("nombre").value;
	var direccion = document.getElementById("direccion").value;
	var latitud = document.getElementById("latitud").value;
	var longitud = document.getElementById("longitud").value;
	var fechaActividad = document.getElementById("fechaActividad").value;
	var hora = document.getElementById("hora").value;
	var minutos = document.getElementById("minutos").value;
	var ampm = document.getElementById("ampm").value;
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');

	if(nombre == "" || nombre==" "){
		document.getElementById("alertMessage").innerHTML = "Debe ingresar el nombre.";
		$('.simple-modal-content').modal();
	}
	else{
		if(direccion == "" || direccion == " "){
			document.getElementById("alertMessage").innerHTML = "Debe ingresar la dirección.";
			$('.simple-modal-content').modal();
		}
		else{
			if(latitud == "" || latitud == " "){
				document.getElementById("alertMessage").innerHTML = "Debe ingresar la latitud.";
				$('.simple-modal-content').modal();
			}
			else{
				if(longitud == "" || longitud == " "){
					document.getElementById("alertMessage").innerHTML = "Debe ingresar la longitud.";
					$('.simple-modal-content').modal();
				}
				else{
					if(fechaActividad == "" || fechaActividad == " "){
						document.getElementById("alertMessage").innerHTML = "Debe ingresar la fecha de la actividad.";
						$('.simple-modal-content').modal();
					}
					else{
						var form_data = new FormData();
						var fileImagen = $("#imagen").prop("files")[0];
						form_data.append("imagen", fileImagen);
						form_data.append("nombre", nombre);
						form_data.append("direccion", direccion);
						form_data.append("latitud", latitud);
						form_data.append("longitud", longitud);
						form_data.append("fechaActividad", fechaActividad);
						form_data.append("hora", hora);
						form_data.append("minutos", minutos);
						form_data.append("ampm", ampm);
						form_data.append("tokenCliente", tokenCliente);
						form_data.append("accessToken", accessToken);
						$.ajax({
						url: URL + "/page-add-activity.php",
						type: "POST",
						data: form_data,
						cache : false,
				        contentType : false,
				        processData : false,
						success: function(data){
						document.getElementById("alertMessage").innerHTML = data;
						$('.simple-modal-content').modal();
						if(data == "El registro se ha llevado a cabo exitosamente."){
							setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
							}
						else if(data == "Usuario no autorizado."){
							setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
						}
						},
						error: function(data){
							document.getElementById("alertMessage").innerHTML = "No es posible realizar el registro, verifique su conexión a internet.";
							$('.simple-modal-content').modal();
							}
						});
					}
				}
			}
		}
	}
}