function validate(){
	var criterio = document.getElementById('criterio').value;
	if(criterio == "" || criterio == " "){
		document.getElementById("alertMessage").innerHTML = "Debe ingresar el criterio de búsqueda.";
        $('.simple-modal-content').modal();
	}
	else{
		window.location.href = "page-search-results.html?criterio=" + criterio;
	}
}