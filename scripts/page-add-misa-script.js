function validate(){
	var horarioPDF = document.getElementById("pdfhorario");
	var parroquia = document.getElementById("parroquia").value;
	var lugar = document.getElementById("lugar").value;
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');

	if((parroquia == "") || (parroquia == " ")){
		document.getElementById("alertMessage").innerHTML = "Debe ingresar la parroquia.";
		$('.simple-modal-content').modal();
	}
	else{
		if((lugar == "") || (lugar == " ")){
			document.getElementById("alertMessage").innerHTML = "Debe ingresar el lugar.";
			$('.simple-modal-content').modal();
		}
		else{
			if(horarioPDF.value != ""){
				var form_data = new FormData();
				var fileHorarioPDF = $("#pdfhorario").prop("files")[0];
				form_data.append("pdfhorario", fileHorarioPDF);
				form_data.append("parroquia", parroquia);
				form_data.append("lugar", lugar);
				form_data.append("tokenCliente", tokenCliente);
				form_data.append("accessToken", accessToken);

				$.ajax({
					url: URL + "/page-add-misa.php",
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
				document.getElementById("alertMessage").innerHTML = "Debe ingresar el archivo PDF del horario.";
				$('.simple-modal-content').modal();
			}
		}
	}
}