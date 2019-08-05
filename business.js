function createBusiness() {
	console.log("createBusiness");
	//updateObject('activeBusiness','creating',user);
	window['activeBusiness']={status:'create'};
	console.log(activeBusiness);
	$('.navCategory').find('span:contains("Business")').parents('.navCategory').click();
	$('.navCategory').find('span:contains("Business")').parents('.categoryName').next().find('li:contains("Overview")')
}
