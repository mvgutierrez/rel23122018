function validate(){
	var nombre = document.getElementById("nombre").value;
	var telefono = document.getElementById("telefono").value;
	var descripcion = document.getElementById("descripcion").value;

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
			if((descripcion == "") || (descripcion == " ")){
				document.getElementById("alertMessage").innerHTML = "Por favor escriba la descripción.";
				$('.simple-modal-content').modal();
			}
			else{
				var postData = {"nombre" : nombre,
										"telefono" : telefono,
									    "descripcion" : descripcion,
										"tokenCliente" : window.sessionStorage.getItem('tokenCliente'),
										"accessToken" : window.sessionStorage.getItem('accessToken')};
						
				$.ajax({
					type: "POST",
					url: URL + "/page-add-emergency-post.php",
					data: postData, 
					success: function(data){
					    document.getElementById("alertMessage").innerHTML = data;
					    $('.simple-modal-content').modal();
					    if(data == "El registro se ha realizado exitosamente."){
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