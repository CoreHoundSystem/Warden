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
	if(key==displayName) {
		$('#userName').html(value);
	}
	if(key==portrait) {
		$('#userPort').css('background-image',value);
	}
}
