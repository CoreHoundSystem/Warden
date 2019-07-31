objects=[
	{q: "name='App Data'",fields:'files(id,trashed,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName))'},
	{spaces:'appDataFolder',fields:'files(id,trashed,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName))'}
];

function updateUser(key,value,object) {
	window[object][key]=value;
	console.log(window[object]);
}

function newAccount(email) {
	window['USER_ID']=email;
	window['user']={};
	updateUser('email',email,'user');
	console.log(user);
	getDriveID(objects[0]);
}

function getDriveID(obj) {
	gapi.client.drive.files.list(obj).then(function(response) {
		console.log(response);
		updateUser('driveKey',response.result.parents[0],'user');
		getAppDataFileList(objects[1]);
	},
	function(err) { 
		console.error("Execute error",err);
	})
	
}

function getAppDataFileList(obj) {
	gapi.client.drive.files.list(obj).then(function(response) {
		console.log(response);
		if(response.result.files.length==0) {
			createNewAccount();
		} else {
			response.result.files.forEach(function(file) {
				console.log("File found: " + file.id);
			})
		}
	},
	function(err) { 
		console.error("Execute error",err);
	})
}

function createNewAccount() {
	console.log("Starting new account!");
	//create first folder
	obj={name:'Users',mimeType:'application/vnd.google-apps.folder',parents:'appDataFolder',fields:'id,parents,owners(me,permissionId,emailAddress,displayName)'};
	gapi.client.drive.files.create(obj).then(function(response) {
		//update user
		updateUser('usersFolderKey',response.result.id,'user');
		updateUser('displayName',response.result.owners[0].displayName,'user');
		//create email sheet
		obj={properties: {title: user.email},fields:'spreadsheetId'};
		gapi.client.sheets.spreadsheets.create(obj).then(function(response) {
			//update user
			updateUser('emailSheetKey',response.result.spreadsheetId,'user');
			//move email sheet
			obj={addParents:[user.usersFolderKey],removeParents:['drive'],fileId:response.result.spreadsheetId,fields:'*'};
			gapi.client.drive.files.update(obj).then(function(response) {
				console.log(response);
				//update sheet
				obj={spreadsheetId:user.emailSheetKey,range:'A1',majorDimension:'ROWS',values:[[JSON.stringify(user)]],valueInputOption: 'RAW',fields:'*'};
				gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
					console.log(response);
					//creation complete?
					sendEventToAnalytics('user','new',user.email);
				})
			})
		})
	})
}

//updateUser('driveKey',response.result.parents[0],'user');
