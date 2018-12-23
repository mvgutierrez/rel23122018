function deleteContent(id){
	var tipo = getParameterByName('tipo');
    var tokenCliente = window.sessionStorage.getItem('tokenCliente');
    var accessToken = window.sessionStorage.getItem('accessToken');
    
	$.ajax({
        type: 'GET',
        url: URL + '/page-remove-img-removeContent.php?tipo=' + tipo + '&id=' + id + '&at=' + accessToken + '&tc=' + tokenCliente,
        data: {test: '1'},
        success: function(data)
        {
        	document.getElementById("alertMessage").innerHTML = data;
            $('.simple-modal-content').modal();
            if(data == "Se ha eliminado correctamente el elemento seleccionado."){
                setTimeout(function() { window.location.replace("page-admin.html"); }, 2000);
            }
            else if(data == "Usuario no autorizado."){
                setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
            }
        },
        error: function(data){
            document.getElementById("alertMessage").innerHTML = "No es posible eliminar el elemento solicitado, verifique su conexión a internet.";
            $('.simple-modal-content').modal();
        }
    });
}