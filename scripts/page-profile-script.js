function goMap(lat,long){
	if(lat != '#' && long != '#'){
		window.location.href = "https://www.google.com/maps/search/?api=1&query=" + lat + "," + long;
	}
	else{
		document.getElementById('alertMessage').innerHTML = 'Opción no disponible.';
		$('.simple-modal-content').modal();
	}
}

function goFacebook(facebook){
	if(facebook != '#'){
		window.location.href = facebook;
	}
	else{
		document.getElementById('alertMessage').innerHTML = 'Opción no disponible.';
		$('.simple-modal-content').modal();
	}
}

function goCorreo(correo){
	if(correo != '#'){
		window.location.href = correo;
	}
	else{
		document.getElementById('alertMessage').innerHTML = 'Opción no disponible.';
		$('.simple-modal-content').modal();
	}
}

function goWaze(lat,long){
	if(lat != '#' && long != '#'){
		window.location.href = "https://waze.com/ul?ll=" + lat + "," + long;
	}
	else{
		document.getElementById('alertMessage').innerHTML = 'Opción no disponible.';
		$('.simple-modal-content').modal();
	}
}



