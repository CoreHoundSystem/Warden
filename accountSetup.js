function newAccount(email) {
	window['USER_ID']=email;
	window['user']={};
	updateUser('email',email,'user');
	console.log(user);
	obj={spaces:'appDataFolder',fields:'files(id,trashed,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName))'};	
	getAppDataFileList(obj);
}

function getAppDataFileList(obj) {
	gapi.client.drive.files.list(obj).then(function(response) {
		response.files.forEach(function(file) {
			console.log("File found: " + file.id);
		})
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function updateUser(key,value,object) {
	window[object][key]=value;
	console.log(window[object]);
}
