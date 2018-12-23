function countChecks(){
	allCheckboxes = document.getElementsByClassName("category");
	contador = 0;
	index = 0;
	while(index < allCheckboxes.length){
		if(allCheckboxes[index].checked){
			contador += 1;
		}
		index += 1;
	}
	return contador;
}

function getCategories(){
	allCheckboxes = document.getElementsByClassName("category");
	allCategories = "";
	index = 0;
	while(index < allCheckboxes.length){
		if(allCheckboxes[index].checked){
			allCategories += allCheckboxes[index].id + "%";
		}
		index += 1;
	}
	return allCategories;
}

function validate(){
	var nombre = document.getElementById("nombre").value;
	var telefono = document.getElementById("telefono").value;
	var dirCorta = document.getElementById("dirCorta").value;
	var latitud = document.getElementById("latitud").value;
	var longitud = document.getElementById("longitud").value;
	var correo = document.getElementById("correo").value;
	var facebook = document.getElementById("facebook").value;
	var tarifas = document.getElementById("tarifas").value;
	var descripcion = document.getElementById("descripcion").value;
	var lunes = document.getElementById("lunes").value;
	var martes = document.getElementById("martes").value;
	var miercoles = document.getElementById("miercoles").value;
	var jueves = document.getElementById("jueves").value;
	var viernes = document.getElementById("viernes").value;
	var sabado = document.getElementById("sabado").value;
	var domingo = document.getElementById("domingo").value;
	var logotipo = document.getElementById("logotipo");
	var portada = document.getElementById("portada");
	var fileLogotipo = null;
	var filePortada = null;
	var activo = 0;
	var premium = 0;
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');

	if(!countChecks()>0){
		document.getElementById("alertMessage").innerHTML = "Por favor seleccione las categorias del comercio a registrar.";
		$('.simple-modal-content').modal();
		return;
	}
	
	var categorias = getCategories();

	if(document.getElementById("activo").checked)
	{
		activo = 1;
	}

	if(document.getElementById("premium").checked)
	{
		premium = 1;
	}

	if((nombre == "") || (nombre == " ")){
		document.getElementById("alertMessage").innerHTML = "Por favor escriba el nombre.";
		$('.simple-modal-content').modal();
	}

	else{
		if((telefono == "") || (telefono == " ")){
			document.getElementById("alertMessage").innerHTML = "Por favor escriba el teléfono.";
			$('.simple-modal-content').modal();
		}
		else{
			if((dirCorta == "") || (dirCorta == " ")){
				document.getElementById("alertMessage").innerHTML = "Por favor escriba la dirección.";
				$('.simple-modal-content').modal();
			}
			else{
				if((logotipo.value != "")){
					fileLogotipo = $("#logotipo").prop("files")[0];
				}
				if((portada.value != "")){
					filePortada = $("#portada").prop("files")[0];
				}
				var banderaCorreo = false;
				if(correo != ""){
					if((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(correo)){
						banderaCorreo = true;
					}
				}
				else{
					correo = "#";
					banderaCorreo = true;
				}
				if(banderaCorreo){
					if(lunes=="") lunes = "Cerrado";
					if(martes=="") martes = "Cerrado";
					if(miercoles=="") miercoles = "Cerrado";
					if(jueves=="") jueves = "Cerrado";
					if(viernes=="") viernes = "Cerrado";
					if(sabado=="") sabado = "Cerrado";
					if(domingo=="") domingo = "Cerrado";
					if(facebook=="") facebook = "#";
					if(descripcion=="") descripcion = "Descripción no disponible.";
					if(tarifas=="") tarifas = "Sin información de tarifas.";
					if(latitud=="") latitud = "#";
					if(longitud=="") longitud = "#";

					var form_data = new FormData();   
					form_data.append("logotipo", fileLogotipo);
					form_data.append("portada", filePortada);
					form_data.append("nombre", nombre);
					form_data.append("telefono", telefono);
					form_data.append("dirCorta", dirCorta);
					form_data.append("latitud", latitud);
					form_data.append("longitud", longitud);
					form_data.append("correo", correo);
					form_data.append("facebook", facebook);
					form_data.append("tarifas", tarifas);
					form_data.append("descripcion", descripcion);
					form_data.append("lunes", lunes);
					form_data.append("martes", martes);
					form_data.append("miercoles", miercoles);
					form_data.append("jueves", jueves);
					form_data.append("viernes", viernes);
					form_data.append("sabado", sabado);
					form_data.append("domingo", domingo);
					form_data.append("categorias", categorias);
					form_data.append("activo", activo);
					form_data.append("premium", premium);
					form_data.append("tokenCliente", tokenCliente);
					form_data.append("accessToken", accessToken);
			
					$.ajax({
						url: URL + "/page-add-post.php",
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