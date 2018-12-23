const URL = 'http://localhost:1212/php';

function guard()
{
	var tokenCliente = window.sessionStorage.getItem('tokenCliente');
	var accessToken = window.sessionStorage.getItem('accessToken');
	if(!tokenCliente || !accessToken)
	{
		document.getElementById("alertMessage").innerHTML = "Usuario no autorizado.";
		$('.simple-modal-content').modal();
		setTimeout(function() { window.location.replace("pageapp-login.html?login=administrador"); }, 2000);
	}
}