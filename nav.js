$('#navigationCollapse>div').click(function() {
	$(this).parent().parent().toggleClass('collapsed');
})

$('.navCategory').click(function() {
	thisCollapsed=false;
	if($(this).hasClass('collapsed')) {
		thisCollapsed=true;
	}
	$('.navCategory').each(function() {
		$(this).addClass('collapsed');
	})
	if(thisCollapsed==true) {
		$(this).removeClass('collapsed');
	}
})

$('.logoBox, .warden').click(function() {
	window.location.reload(true);
	//window.location.href="https://warden.corehoundsystem.com/";
})

$('li').each(function() {
	if($(this).next().is('ul')) {
		$(this).addClass('expandable');
	}
})

$('li').click(function(e) {
	e.preventDefault();
	e.stopPropagation();
	if($(this).parent().parent().is('ul')) {
		$(this).siblings('li').each(function() {
			$(this).removeClass('active');
		})
	} else {
		$('li').each(function() {
			$(this).removeClass('active');
		})
	}
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

$('#businessSelect button').click(function() {
	if(!$('#businessModal').length) {
		$('#businessSelect').append('<div id="businessModal" class="localModal"></div>');
	} else {
		
	}
	if(myBusiness&&$('#businessModal').length) {
		
	} else {
		$('#businessModal').append('<div id="createBusiness">Create A Business</div>')
	}
	$('#createBusiness').click(function() {
		createBusiness();
	})
	$('#businessModal').blur(function() {
		$('#businessModal').remove();
	}
})

$(function() {
	$('.navCategory').find('span:contains("Business")').parents('.navCategory').click();
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
