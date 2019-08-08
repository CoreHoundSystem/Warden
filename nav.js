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
	if($(this).next().is('ul')) {
		$(this).find('ul').toggleClass('collapsed');
		console.log(n);
	} else {
		p=$(this).parents('.navCategory').find('span').text();
		c=$(this).text();
		loadMainContainer(p,c,n);
	}
})

$('#businessSelect button').click(function() {
	if(!$('#businessModal').length) {
		$('#businessSelect').append('<div id="businessModal" class="localModal"></div>');
	} else {
		
	}
	if(typeof myBusinesses !== 'undefined'&&$('#businessModal').length) {
		
	} else {
		$('#businessModal').append('<div id="createBusiness" class="businessBox">Create A Business</div>')
	}
	$('#createBusiness').click(function() {
		createBusiness();
	})
	//$('#businessModal').focusout(function()
	$(document).mouseup(function(e) {
		if(!$('#businessModal').is(e.target)&&$('#businessModal').has(e.target).length === 0) {
			$('#businessModal').remove();
		}
	})
})

$(function() {
	//$('.navCategory').find('span:contains("Business")').parents('.navCategory').click();
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
	console.log(p,c,n);
	$('#innerContainer').empty();
	if(p=='Business',c=='Overview') {
		/*if(activeBusiness.status=='create') {
			
		}*/
		//business name
		//short description
		
		//phone number
		//fax number
		//business email
		//street 1
		//street 2
		//city, state, zip
		//website
		//social media - icons are grey unless given a url AFTER CREATION REMOVE GREYS AND ALLOW ADD BUTTON!!
			//facebook
			//twitter
			//instagram
			//pinterest
			//yelp
			
		//your role
		
		//mission statement
		
		
		//$('#innerContainer').append('<div class="band"><div class="column"><div id="bInfo"><div id="bName">' + dataCell('activeBusiness.name','input','text','Enter Business Name') + '</div><div id="sDesc">' + dataCell('activeBusiness.shortDescription','textarea',2,'Describe the business') + '</div></div><div id="bContact"></div></div></div>');
		
		$('#innerContainer').html(`
		<h1 class="floating">` + p + `>` + c + `</h1>
		<div class="band">
			<div class="column">
				<div class="area">
					<div class="cellHolder">` + dataCell('activeBusiness.name','input','text','Enter Business Name',[]) + `</div>
					<div class="cellHolder">` + dataCell('activeBusiness.shortDescription','textarea',3,'Describe the business',[]) + `</div>
				</div>
				<div class="area">
					<div class="cellHolder">` + dataCell('activeBusiness.street1','input','text','Street Address 1',[]) + `</div>
					<div class="cellHolder">` + dataCell('activeBusiness.street2','input','text','Street Address 2',[]) + `</div>
					<div class="cellHolder">` + dataCell('activeBusiness.city','input','text','City',['half']) + dataCell('activeBusiness.state','input','text','State',['quarter']) + dataCell('activeBusiness.zip','input','text','Zip',['quarter']) + `</div>
					<hr>
					<div class="cellHolder">` + dataCell('activeBusiness.phone','input','text','Phone',['phone']) + `</div>
					<div class="cellHolder">` + dataCell('activeBusiness.fax','input','text','Fax',['phone']) + `</div>
				</div>
			</div>
		</div>`
		);
		
	}
	$('.cellHolder .phone').on('input',function() {
		numb='';
		input=$(this).val().replace(/()-/g,'');
		for(var i=0;i<input.length;i++) {
			if(i==0) {
				numb=numb+'('+input[i];
			}
			if(i==2) {
				numb=numb+input[i]+')';
			}
			if(i==5) {
				numb=numb+input[i]+'-';
			}
			if(i==1||i==3||i==4||i==5||i==6||i==7||i==8||i==9||i==10) {
				numb=numb+input[i];
			}
			
		}
		$(this).val(numb);
		//return numb
	})
	//	??business team members - roles - contact
}

function dataCell(source,tag,type,placeholder,classes) {
	data='';
	if(tag=='input') {
		data='<input type="' + type + '" class="descrete ' + classes.join(" ") + '" placeholder="' + placeholder + '" name="' + source + '" ' + values(source) + '>';
	}
	if(tag=='textarea') {
		data='<textarea rows=' + type + ' class="descrete ' + classes.join(" ") + '" placeholder="' + placeholder + '" name="' + source + '" ' + values(source) + '></textarea>';
	}
	return data
}

function values(x) {
	value='';
	test=window[x];
	if(typeof test !== 'undefined') {
		value='value="' + test + '"';
	}
	return value
}
