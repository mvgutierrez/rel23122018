function validate(){
	var imagenPromo = document.getElementById("imagenPromo");
	if(document.getElementById("categoria").value == ""){
		document.getElementById("alertMessage").innerHTML = "Debe seleccionar el comercio.";
		$('.simple-modal-content').modal();
	}
	else{
		var comercio = document.getElementById("categoria").value;
		if(imagenPromo.value != ""){
			var form_data = new FormData();
			var fileImagenPromo = $("#imagenPromo").prop("files")[0];
			var tokenCliente = window.sessionStorage.getItem('tokenCliente');
			var accessToken = window.sessionStorage.getItem('accessToken');
			form_data.append("imagenPromo", fileImagenPromo);
			form_data.append("comercio", comercio);
			form_data.append("tokenCliente", tokenCliente);
			form_data.append("accessToken", accessToken);

			$.ajax({
				url: URL + "/page-add-promo.php",
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
		else{
			document.getElementById("alertMessage").innerHTML = "Debe ingresar la imagen de la promoción.";
			$('.simple-modal-content').modal();
		}
	}
	
}