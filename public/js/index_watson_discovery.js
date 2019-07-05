function expand() {
	$(".search").toggleClass("close");
	$(".input").toggleClass("square");
	if ($('.search').hasClass('close')) {
		$('input').focus();
		
	} else {
		$('input').blur();
	}
}
$('button').on('click', expand); 

function clearSearch(){
	document.getElementById("search").value="";
}

(function($) {
	$(document).ready(function() {
		$("#main-search").fadeIn(1500);
	});

})(jQuery);