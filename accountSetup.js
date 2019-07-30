function newAccount(email) {
	window['user']={'email':email};
	console.log(user);
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'searchAccount',null);	//seek id, trashed, owners - me, email, ownedByMe
}

function getFileList(obj,respFunction,x) {
	gapi.client.drive.files.list(obj).then(function(response) {
		window[respFunction](response,x);
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

//determines if there are NO matches, a signle match, or multiple matches to the initial folder of the file structure.
function searchAccount(response,x) {
	console.log(response);
	files=response.result.files;
	console.log(files);
	parentIDs=[];
	for(var i=0;i<files.length;i++) {
		if(files[i].trashed==false&&files[i].ownedByMe==true&&files[i].owners[0].emailAddress==user.email) {
			console.log((files[i].trashed==false));
		}
		if(files[i].ownedByMe==true) {
			console.log((files[i].ownedByMe==true));
		}
		if(files[i].owners[0].emailAddress==user.email) {
			console.log((files[i].owners[0].emailAddress==user.email));
		}
		if(files[i].trashed==false&&files[i].ownedByMe==true&&files[i].owners[0].emailAddress==user.email) {
			parentIDs.push(files[i].id);
		}
	}
	if(parentIDs.length===0) {
		console.log("Create new account in this drive.");
	}
	if(parentIDs.length===1) {
		console.log("Account may exist, lets look some more...");
		window['WardenFolderID']=parentIDs[0];
		console.log(window['WardenFolderID']);
		console.log(parentIDs);
		obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};
		getFileList(obj,'confirmSolo',0);		//seek id, trashed, owners - me, email, ownedByMe
	}
	if(parentIDs.length>1) {
		console.log("Hmmm.... now what?");
		//isolateTrueWarden(parentIDs);
		
		
		obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};
		getFileList(obj,'matchParents',parentIDs);
	}
}

//this function determines if the ONLY 'Warden CRM' folder contains requisite children.
function confirmSolo(response,x) {
	console.log(response,x);
	matchCounter=0;
	if(x==0) {
		for(var i=0;i<response.result.files.length;i++) {
			console.log();
			for(var j=0;j<response.result.files[i].parents.length;j++) {
				if(response.result.files[i].parents[j]==WardenFolderID) {
					user.masterFolderId=response.result.files[i].parents[i];
					user.usersFolderId=response.result.files[i].id;
					console.log("Ca-ching!");
					matchCounter++;
				}
			}
		}
	}
	console.log(user);
	//console.log(matchCounter);
	console.log("Only the lonely");
	//folder to move on to user's email address...
}
/*
function isolateTrueWarden(parentIDs) {
	trueParent='';
	pIDs=[];
	//redundant...
	for(var i=0;i<parentIDs.length;i++) {
		console.log(parentIDs[i]);
		pIDs.push(parentIDs[i]);
	}
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};
	getFileList(obj,'matchParents',parentIDs);
}
*/
//this function takes an array 'Warden CRM' folder IDs and compares them to an array of 'User' folder IDs - should be made more versatile...
function matchParents(response,x) {
	console.log(response);		//response for a list of folders named 'User' - x represents an array of parent ID options
	children=response.result.files;
	masterFolderId=[];
	userFolderId=[];
	for(var i=0;i<children.length;i++) {
		console.log(children[i].parents);
		for(var j=0;j<x.length;j++) {
			if(children[i].parents.indexOf(x[j])!=-1) {
				masterFolderId.push(x[j]);
				userFolderId.push(children[i].id);
			}
		}
	}
	if(masterFolderId.length==0) {
		console.log("Create new account in this drive.");
	}
	if(masterFolderId.length==1) {
		user.masterFolderId=masterFolderId[0];
		user.usersFolderId=userFolderId[0];
		console.log("Only the lonely");
	}
	if(masterFolderId.length>1) {
		console.log("Hmmm.... now what?");
	}
	console.log(user);
}
