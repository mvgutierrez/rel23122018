function validate(){
	var usuario = document.getElementById("usuario").value;
	var contrasenna = document.getElementById("contrasenna").value;
	var tipoLogin = getParameterByName('login');
	if((usuario == "") || (usuario == " ")){
		document.getElementById("alertMessage").innerHTML = "Debe escribir su usuario.";
		$('.simple-modal-content').modal();
	}
	else{
		if((contrasenna == "") || (contrasenna == " ")){
			document.getElementById("alertMessage").innerHTML = "Debe escribir su contraseña.";
			$('.simple-modal-content').modal();
		}
		else{
			var postData = {"usuario" : usuario,
							"contrasenna" : contrasenna};
						
			$.ajax({
			type: "POST",
			url: URL + "/pageapp-login-post.php",
			data: postData, 
			success: function(data){
				if(data != ""){
					if(data == "No es posible realizar el inicio de sesión, verifique su conexión a internet."){
						document.getElementById("alertMessage").innerHTML = data;
						$('.simple-modal-content').modal();
					}
					else{
						document.getElementById("alertMessage").innerHTML = "Bienvenido " + usuario + ".";
						$('.simple-modal-content').modal();
						var jsonData = JSON.parse(data);

						if((tipoLogin == "administrador") && (jsonData.tipoUsuario=="administrador")){
							window.sessionStorage.setItem('tokenCliente', jsonData.tokenCliente);
							window.sessionStorage.setItem('accessToken', jsonData.accessToken);
							setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
						}
						else{
							setTimeout(function() { window.location.replace("pageapp-bubbles.html?usuario="+usuario); }, 2000);
						}
					}
				}
				else{
					document.getElementById("alertMessage").innerHTML = "El usuario o la contraseña son incorrectos.";
					$('.simple-modal-content').modal();
				}
			},
			error: function(data){
				document.getElementById("alertMessage").innerHTML = "No es posible realizar el inicio de sesión, verifique su conexión a internet.";
				$('.simple-modal-content').modal();
			}
			});
		}
	}
}

function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function enviarCorreo(){
	var correoRecuperacion = document.getElementById("correoRecuperacion").value;
	if(correoRecuperacion=="" || correoRecuperacion == " "){
		document.getElementById("btnCerrar").click();
		setTimeout(function() { document.getElementById("alertMessage").innerHTML = "Debe ingresar un correo electrónico."; $('.simple-modal-content').modal();}, 1000);
	}
	else{
		if((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(correoRecuperacion)){
			var postData = {"correo" : correoRecuperacion};
			$.ajax({
			type: "POST",
			url: URL + "/email.php",
			data: postData, 
			success: function(data){
				document.getElementById("btnCerrar").click();
				setTimeout(function() { document.getElementById("alertMessage").innerHTML = data; $('.simple-modal-content').modal();}, 1000);
			},
			error: function(data){
				document.getElementById("btnCerrar").click();
				setTimeout(function() { document.getElementById("alertMessage").innerHTML = "En este momento no es posible enviar el correo electrónico con la contraseña, verifique su conexión a internet."; $('.simple-modal-content').modal();}, 1000);
			}
			});		
		}
		else{
			document.getElementById("btnCerrar").click();
			setTimeout(function() { document.getElementById("alertMessage").innerHTML = "El formato del correo electrónico ingresado no es válido."; $('.simple-modal-content').modal();}, 1000);
		}
	}
}