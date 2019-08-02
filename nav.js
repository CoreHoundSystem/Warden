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

$('li').click(function() {
	$('li').each(function() {
		$(this).removeClass('active');
	})
	$(this).addClass('active');
	n='';
	if(typeof $(this).attr('name') !== typeof undefined && $(this).attr('name') !== false) {
		n=$(this).attr('name');
	}
	if($(this).has('ul')) {
		$(this).find('ul').toggleClass('collapsed');
	} else {
		p=$(this).parents('.categoryName').children('span').text();
		c=$(this).text();
		loadMainContainer(p,c,n);
	}
})

function loadModal(time,message) {
	if(!$('#loadModal').length) {
		$('body').append('<div id="loadModal" class="collapsed"><div id="loadBody"></div></div>')
	}
	$('#loadBody').text(message);
	$('#loadModal').removeClass('collapsed');
	loadingTimer=setTimeout(function() {
		$('#loadModal').addClass('collapsed');
	},time);
}

function loadMainContainer(p,c,n) {
	
}
