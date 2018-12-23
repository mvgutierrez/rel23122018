function loadInfo(){
	var actividad = document.getElementById("actividad").value;

	if(actividad!=""){
		$.ajax({
            type: 'GET',
            url: URL + '/page-edit-activity-load-activity.php?id=' + actividad,
            data: {test: '1'},
            success: function(data)
            {
                if(data == "No es posible obtener las actividades, verifique su conexión a internet."){
                    document.getElementById("alertMessage").innerHTML = data;
                    $('.simple-modal-content').modal();
                    setTimeout(function() {window.history.back(); }, 2000);
                }
                else{
                    var info = data.split("%");
                    document.getElementById("nombre").value = info[0];
                    document.getElementById("direccion").value = info[1];
                    document.getElementById("latitud").value = info[2];
                    document.getElementById("longitud").value = info[3];
                    document.getElementById("fechaActividad").value = info[4];
                    document.getElementById("hora" + info[5]).selected = "selected";
                    document.getElementById("minutos" + info[6]).selected = "selected";
                    document.getElementById(info[7]).selected = "selected";
                }
            },
            error: function(data){
                document.getElementById("alertMessage").innerHTML = "No es posible obtener las actividades, verifique su conexión a internet.";
                $('.simple-modal-content').modal();
                setTimeout(function() {window.history.back(); }, 2000);
            }
        });
	}
}

function update(){
	var actividad = document.getElementById("actividad").value;
	if(actividad!= ""){
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
							form_data.append("id", actividad);
							form_data.append("tokenCliente", tokenCliente);
							form_data.append("accessToken", accessToken);
							$.ajax({
							url: URL + "/page-edit-activity-update.php",
							type: "POST",
							data: form_data,
							cache : false,
					        contentType : false,
					        processData : false,
							success: function(data){
							document.getElementById("alertMessage").innerHTML = data;
							$('.simple-modal-content').modal();
							if(data == "La actualización se ha llevado a cabo exitosamente."){
								setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
								}
							else if(data == "Usuario no autorizado."){
								setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
							}
							},
							error: function(data){
								document.getElementById("alertMessage").innerHTML = "No se ha podido realizar la actualización, verifique su conexión a internet.";
								$('.simple-modal-content').modal();
								}
							});
						}
					}
				}
			}
		}
	}
	else{
		document.getElementById("alertMessage").innerHTML = "Debe seleccionar la actividad a actualizar.";
		$('.simple-modal-content').modal();
	}
	
}

function eliminar(){
	var actividad = document.getElementById("actividad").value;
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');
	if(actividad != ""){
		$.ajax({
			url: URL + "/page-edit-activity-delete.php?id="+actividad+"&at=" + accessToken + "&tc=" + tokenCliente,
			type: "GET",
			success: function(data){
			document.getElementById("alertMessage").innerHTML = data;
			$('.simple-modal-content').modal();
			if(data == "Se ha eliminado correctamente la actividad."){
				setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
				}
			else if(data == "Usuario no autorizado."){
				setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
			}
			},
			error: function(data){
				document.getElementById("alertMessage").innerHTML = "No es posible eliminar la actividad, verifique su conexión a internet.";
				$('.simple-modal-content').modal();
				}
		});
	}
	else{
		document.getElementById("alertMessage").innerHTML = "Debe seleccionar la actividad a eliminar.";
		$('.simple-modal-content').modal();
	}	
}
