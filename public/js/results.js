/**
 * http://usejsdoc.org/
 */
(function ($) {
	$(document).ready(function () {
		cargarResultados();
		$("#myModal").fadeIn(3000);
	});

})(jQuery);

function openNav() {
	document.getElementById("stats").style.width = "100%";
}

function closeNav() {
	document.getElementById("stats").style.width = "0%";
}

async function cargarResultados() {
	var input = getParameterByName('search');
	$("#result-search").val(input);
	console.log("input a buscar: " + input);
	var payload = {
		query: input
	}
	Api.postJsonAsync(JSON.stringify(payload));
	
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function inputKeyDown(event) {
	// Submit on enter key, dis-allowing blank messages
	if (event.keyCode === 13) {
		var payload = {
			query: $("#result-search").val()
		}
		Api.postJsonAsync(JSON.stringify(payload));
		// Clear input box for further messages
		//$("#result-search").val('');
	}
}

var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

$("#icon-search-button").click(function () {
	var payload = {
		query: $("#result-search").val()
	}
	Api.postJsonAsync(JSON.stringify(payload));
});