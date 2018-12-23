function validate(){
	var name = document.getElementById("name").value;
	var user = document.getElementById("user").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var phone = document.getElementById("phone").value;
	if ((name == "Nombre completo") || (name == " ")){
		document.getElementById("alertMessage").innerHTML = "Por favor escriba su nombre.";
		$('.simple-modal-content').modal();
	}

	else{

		if ((user == "Usuario") || (user == " ")){
			document.getElementById("alertMessage").innerHTML = "Debe escribir su usuario.";
			$('.simple-modal-content').modal();
		}

		else{

			if((phone == "Número de teléfono") || (phone == " ")){
				document.getElementById("alertMessage").innerHTML = "Debe escribir su número de teléfono.";
				$('.simple-modal-content').modal();	
			}

			else{
				if((email == "Correo electrónico") || (email == " ")){
					document.getElementById("alertMessage").innerHTML = "Debe completar el espacio para el correo electrónico.";
					$('.simple-modal-content').modal();
				}

				else{
						if((/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email)){
					
							if((password == "password") || (password == " ")){
								document.getElementById("alertMessage").innerHTML = "La contraseña seleccionada no es válida.";
								$('.simple-modal-content').modal();
							}

						else{
							var postData = {"password" : password,
											"name" : name,
										    "user" : user,
											"email" : email,
											"phone" : phone,
											"dateOfBirth" : document.getElementById("dateOfBirth").value};
						
							$.ajax({
					        	type: "POST",
					        	url: URL + "/pageapp-signup-post.php",
					        	data: postData, 
					        	success: function(data){
					            	document.getElementById("alertMessage").innerHTML = data;
					            	$('.simple-modal-content').modal();
					            	if(data == "Usuario registrado con éxito."){
					            		setTimeout(function() { window.location.replace("pageapp-login.html"); }, 2000);
					            	}
					        	},
					        	error: function(data){
					        		document.getElementById("alertMessage").innerHTML = "No es posible realizar el registro, verifique su conexión a internet.";
					        		$('.simple-modal-content').modal();
					        	}
					    	});
						}
					}

				else{
					document.getElementById("alertMessage").innerHTML = "El formato del correo electrónico no es válido.";
					$('.simple-modal-content').modal();	
				}
			}
			}
			
		}

	} 
}