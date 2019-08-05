function createBusiness() {
	console.log("createBusiness");
	//updateObject('activeBusiness','creating',user);
	window['activeBusiness']={status:'create'};
	console.log(activeBusiness);
	$('#businessModal').remove();
	if($('.navCategory').find('span:contains("Business")').parents('.navCategory').hasClass('collapsed')) {
		$('.navCategory').find('span:contains("Business")').parents('.navCategory').click();
	}
	if($('.navCategory').find('span:contains("Business")').parents('.categoryName').next().find('li:contains("Overview")').hasClass('active')) {
		
	} else {
		$('.navCategory').find('span:contains("Business")').parents('.categoryName').next().find('li:contains("Overview")').click();
	}
	/*
	$('.navCategory span').each(function() {
		if($(this).text()=="Business") {
			if($(this).hasClass('collapsed') {
				$(this).click();
			}
		}
	})
	*/
}
