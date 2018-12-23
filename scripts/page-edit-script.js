var initialCategories = null;
function loadInfo(){
	var id = document.getElementById("establecimiento").value;

	if(id!=""){
		$.ajax({
		    type: 'GET',
		    url: URL + '/load-commerce-info.php?id=' + id,
		    data: {test: '1'},
		    success: function(data)
		    {
		        if(data == "No es posible obtener la información del comercio seleccionado, verifique su conexión a internet."){
		            document.getElementById("alertMessage").innerHTML = data;
		            $('.simple-modal-content').modal();
		        }
		        else{
					var datos = data.split("%");
					document.getElementById("nombre").value = datos[0];
					document.getElementById("telefono").value = datos[1];
					document.getElementById("dirCorta").value = datos[2];
					if(datos[3] == "#"){
						document.getElementById("latitud").value = "";	
					}

					else{
						document.getElementById("latitud").value = datos[3];
					}

					if(datos[4] == "#"){
						document.getElementById("longitud").value = "";	
					}

					else{
						document.getElementById("longitud").value = datos[4];
					}

					if(datos[5] == "#"){
						document.getElementById("correo").value = "";	
					}

					else{
						document.getElementById("correo").value = datos[5];
					}

					if(datos[6] == "#"){
						document.getElementById("facebook").value = "";	
					}

					else{
						document.getElementById("facebook").value = datos[6];
					}

					if(datos[7] == "Sin información de tarifas."){
						document.getElementById("tarifas").value = "";	
					}

					else{
						document.getElementById("tarifas").value = datos[7];
					}

					if(datos[8] == "Descripción no disponible."){
						document.getElementById("descripcion").value = "";	
					}

					else{
						document.getElementById("descripcion").value = datos[8];
					}

					if(datos[9] == "Cerrado"){
						document.getElementById("lunes").value = "";	
					}

					else{
						document.getElementById("lunes").value = datos[9];
					}

					if(datos[10] == "Cerrado"){
						document.getElementById("martes").value = "";	
					}

					else{
						document.getElementById("martes").value = datos[10];
					}

					if(datos[11] == "Cerrado"){
						document.getElementById("miercoles").value = "";	
					}

					else{
						document.getElementById("miercoles").value = datos[11];
					}

					if(datos[12] == "Cerrado"){
						document.getElementById("jueves").value = "";	
					}

					else{
						document.getElementById("jueves").value = datos[12];
					}

					if(datos[13] == "Cerrado"){
						document.getElementById("viernes").value = "";	
					}

					else{
						document.getElementById("viernes").value = datos[13];
					}

					if(datos[14] == "Cerrado"){
						document.getElementById("sabado").value = "";	
					}

					else{
						document.getElementById("sabado").value = datos[14];
					}

					if(datos[15] == "Cerrado"){
						document.getElementById("domingo").value = "";	
					}

					else{
						document.getElementById("domingo").value = datos[15];
					}
					
					if(datos[16] == 1){
						document.getElementById("activo").checked = true;
					}
					else{
						document.getElementById("activo").checked = false;	
					}

					if(datos[17] == 1){
						document.getElementById("premium").checked = true;
					}
					else{
						document.getElementById("premium").checked = false;	
					}
		        }
		    },
		    error: function(data){
		        document.getElementById("alertMessage").innerHTML = "No es posible obtener la información del comercio seleccionado, verifique su conexión a internet.";
		        $('.simple-modal-content').modal();
		    }
		});

		$.ajax({
		    type: 'GET',
		    url: URL + '/load-commerce-categories.php?id=' + id,
		    data: {test: '1'},
		    success: function(data)
		    {
		        if(data == "No es posible obtener la información del comercio seleccionado, verifique su conexión a internet."){
		            document.getElementById("alertMessage").innerHTML = data;
		            $('.simple-modal-content').modal();
		        }
		        else{
					var categorias = data.split("%");
					categorias.pop();
					uncheckAll();
					contador = 0;
					while(contador < categorias.length){
						document.getElementById(categorias[contador]).checked = true;
						contador += 1;
					}
					initialCategories = getCategories();
		        }
		    },
		    error: function(data){
		        document.getElementById("alertMessage").innerHTML = "No es posible obtener la información del comercio seleccionado, verifique su conexión a internet.";
		        $('.simple-modal-content').modal();
		    }
		});
	}
}

function uncheckAll(){
	allCheckboxes = document.getElementsByClassName("category");
	contador = 0;
	while(contador < allCheckboxes.length){
		allCheckboxes[contador].checked = false;
		contador += 1;
	}
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

function deleteCommerce(){
	var id = document.getElementById("establecimiento").value;
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');

	if(id!=""){
		$.ajax({
	        type: 'GET',
	        url: URL + '/delete-commerce.php?id=' + id + "&at=" + accessToken + "&tc=" + tokenCliente,
	        data: {test: '1'},
	        success: function(data)
	        {
	        	document.getElementById("alertMessage").innerHTML = data;
	            $('.simple-modal-content').modal();
	        	if(data == "Se ha eliminado el comercio exitosamente."){
	        		setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
	        	}
	        	else if(data == "Usuario no autorizado."){
					setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
				}
	        },
	        error: function(data){
	            document.getElementById("alertMessage").innerHTML = "No es posible eliminar el comercio seleccionado, verifique su conexión a internet.";
	            $('.simple-modal-content').modal();
	        }
	    });
	}
	else{
		document.getElementById("alertMessage").innerHTML = "Debe seleccionar el elemento que desea eliminar.";
	    $('.simple-modal-content').modal();		
	}
}

function editCommerce(){
	var id = document.getElementById("establecimiento").value;
	var form_data = new FormData();

	if(id!=""){
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
		var tokenCliente = window.sessionStorage.getItem('tokenCliente');
		var accessToken = window.sessionStorage.getItem('accessToken');
		var activo = 0;
		var premium = 0;

		if(!countChecks()>0){
			document.getElementById("alertMessage").innerHTML = "Por favor seleccione las categorias del comercio a modificar.";
			$('.simple-modal-content').modal();
			return;
		}

		var categorias = getCategories();
		
		if((nombre != "") && (nombre != " ")){
			form_data.append("nombre", nombre);
		}
		if((telefono != "") && (telefono != " ")){
			form_data.append("telefono", telefono);
		}
		if((dirCorta != "") && (dirCorta != " ")){
			form_data.append("dirCorta", dirCorta);
		}
		if((logotipo.value != "")){
			var fileLogotipo = $("#logotipo").prop("files")[0];
			form_data.append("logotipo", fileLogotipo);
		}
		if((portada.value != "")){
			var filePortada = $("#portada").prop("files")[0];
			form_data.append("portada", filePortada);
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

		if(document.getElementById("activo").checked)
		{
			activo = 1;
		}

		if(document.getElementById("premium").checked)
		{
			premium = 1;
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
			form_data.append("latitud", latitud);
			form_data.append("longitud", longitud);
			form_data.append("categorias", categorias);
			form_data.append("categoriasIniciales", initialCategories);
			form_data.append("activo", activo);
			form_data.append("premium", premium);
			form_data.append("id", id);
			form_data.append("tokenCliente", tokenCliente);
			form_data.append("accessToken", accessToken);
								
			$.ajax({
				url: URL + "/update-commerce.php",
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
				  	document.getElementById("alertMessage").innerHTML = "No es posible realizar la actualización, verifique su conexión a internet.";
				   	$('.simple-modal-content').modal();
				}
			});
		}
		else{
			document.getElementById("alertMessage").innerHTML = "El formato del correo electrónico ingresado no es válido.";
			$('.simple-modal-content').modal();
		}
	}
	else{
		document.getElementById("alertMessage").innerHTML = "Debe seleccionar el elemento que desea modificar.";
		$('.simple-modal-content').modal();
	}
}
