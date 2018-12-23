function downloadPDF(id){
    var req = new XMLHttpRequest();
	req.open("GET", URL + "/savePDF.php?id=" + id, true);
	req.responseType = "blob";
	req.onreadystatechange = function () {
		  if (req.readyState === 4) {
		  	if(req.status === 200){
		  		if (typeof window.navigator.msSaveBlob === 'function'){
			    	window.navigator.msSaveBlob(req.response, "horario.pdf");
			    } 
			    else {
			    	var blob = req.response;
			      	var link = document.createElement('a');
			      	link.href = window.URL.createObjectURL(blob);
			      	link.download = "horario.pdf";
			      	document.body.appendChild(link);
			      	link.click();
			    }
		  	}
		  	else{
		  		document.getElementById("alertMessage").innerHTML = "No es posible obtener el horario solicitado, verifique su conexión a internet.";
        		$('.simple-modal-content').modal();
		  	}
		  }
	};
	req.send();
}