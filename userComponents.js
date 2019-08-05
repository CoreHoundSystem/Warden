function updateObject(key,value,object,save) {
	window[object][key]=value;
	if(save==1) {
		console.log(window[object]);
		if(object=='user') {
			obj={spreadsheetId:user.emailSheetKey,range:'A1',majorDimension:'ROWS',values:[[JSON.stringify(user)]],valueInputOption: 'RAW',fields:'*'};
			gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
				console.log(response);
			})
		}
	}
	if(key=='displayName') {
		$('#userName').html(value);
	}
	if(key=='portrait') {
		$('#userPort').css('background-image','url(' + value + ')');
	}
	//if active business has a set title for user
	if(key=='activeBusiness') {
		loadBusiness();
	}
}

/*
user={
	email:
	gID:
	displayName:
	fName:
	lName:
	portrait:
	//keys
	driveKey:
	wardenFolderKey:
	usersFolderKey:
	emailFolderKey:
	emailSheetKey:
	contactsSheetKey:
	businessesFolderKey:
	//
	contactsSyncToken:
	
	//
	businesses:[{id://user gID + unixTimestamp at creation//,businessSheetKey:}]
	activeBusiness: {id://user gID + unixTimestamp at creation//,businessSheetKey:}
}
*/

function loadBusiness() {
	if('activeBusiness' in user) {
		//user.activeBusiness.businessSheetKey
		
	} else {
		$('#businessSelect button').click();
	}
	/*
	//get values from businessSheetKey A1
		$('#userTitle').html(value);//replace this variable...
		if($('#userTitle').text().length>0) {
			$('#userPlate').addClass('filled');
		} else {
			$('#userPlate').removeClass('filled');
		}
		*/
}
