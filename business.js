function createBusiness() {
	console.log("createBusiness");
	//updateObject('activeBusiness','creating',user);
	window['activeBusiness']={status:'create'};
	console.log(activeBusiness);
	$('#businessModal').remove();
	if($('.navCategory').find('span:contains("Business")').parents('.navCategory').has('.collapsed')) {
		$('.navCategory').find('span:contains("Business")').parents('.navCategory').click();
	}
	if($('.navCategory').find('span:contains("Business")').parents('.categoryName').next().find('li:contains("Overview")').has('.active')) {
		
	} else {
		$('.navCategory').find('span:contains("Business")').parents('.categoryName').next().find('li:contains("Overview")').click();
	}
}
