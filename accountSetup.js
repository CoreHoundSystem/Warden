function newAccount(email) {
	window['USER_ID']=email;
	window['user']={};
	updateUser('email',email,'user');
	console.log(user);
	obj={q: "name = 'appDataFolder'",fields:'files(id,trashed,parents,ownedByMe,owners(me,permissionId,emailAddress,displayName))'};	
	getFileList(obj);
}

function getFileList(obj,respFunction,x) {
	gapi.client.drive.files.list(obj).then(function(response) {
		console.log(response);
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function updateUser(key,value,object) {
	window[object][key]=value;
	console.log(window[object]);
}
