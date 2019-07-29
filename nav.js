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
