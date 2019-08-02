$('#navigationCollapse>div').click(function() {
	$(this).parent().parent().toggleClass('collapsed');
})

$('.navCategory').click(function() {
	$(this).toggleClass('collapsed');
})

$('.logoBox').parent('.endCap').click(function() {
	window.location.reload(true);
	//window.location.href="https://warden.corehoundsystem.com/";
})

function loadModal(time,message) {
	if(!$('#loadModal').length) {
		$('body').append('<div id="loadModal" class="collapsed"><div id="loadBody"></div></div>')
	}
	$('#loadBody').text(message).removeClass('collapsed');
	loadingTimer=setTimeout(function() {
		$('#loadModal').addClass('collapsed');
	},time);
}
