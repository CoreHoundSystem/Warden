function newAccount(email) {
	window['user']={};
	updateUser('email',email,'user');
	console.log(user);
	promiseObject={w:0,u:0,e:0,eS:0};
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};	
	getFileList(obj,'checkAccount','w');
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};	
	getFileList(obj,'checkAccount','u');
	obj={q: "name = '" + user.email + "' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};	
	getFileList(obj,'checkAccount','e');
	obj={q: "name = '" + user.email + "' and (mimeType != 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};	
	getFileList(obj,'checkAccount','eS');
}

function getFileList(obj,respFunction,x) {
	gapi.client.drive.files.list(obj).then(function(response) {
		window[respFunction](response,x);
	},
	function(err) { 
		console.error("Execute error",err);
	});
}

function updateUser(key,value,object) {
	window[object][key]=value;
	console.log(window[object]);
}

function checkAccount(response,x) {
	window[x]=response.result.files;
	console.log(window[x]);
	promiseObject[x]=1;
	checkPromise();
}

function checkPromise() {
	if(promiseObject.w==1&&promiseObject.u==1&&promiseObject.e==1&&promiseObject.eS==1) {
		console.log("All lists gained.");
		verifyAccountStructure();
	}
}

function verifyAccountStructure() {
	tree=[];
	displayName=[];
	for(var h=0;h<eS.length;h++) {
		for(var i=0;i<e.length;i++) {
			if(eS[h].parents[0]==e[i].id&&eS[h].trashed==false&&eS[h].ownedByMe==true&&eS[h].owners[0].emailAddress==user.email&&e[i].trashed==false&&e[i].ownedByMe==true&&e[i].owners[0].emailAddress==user.email) {
				window['eSKey']=eS[h].id;
				window['eKey']=e[i].id;
				console.log(eSKey,eKey);
				for(var j=0;j<u.length;j++) {
					if(e[i].parents[0]==u[j].id&&u[j].trashed==false&&u[j].ownedByMe==true&&u[j].owners[0].emailAddress==user.email&&e[i].trashed==false&&e[i].ownedByMe==true&&e[i].owners[0].emailAddress==user.email) {
						window['uKey']=u[j].id;
						console.log(eSKey,eKey,uKey);
						for(var k=0;k<w.length;k++) {
							if(u[j].parents[0]==w[k].id&&u[j].trashed==false&&u[j].ownedByMe==true&&u[j].owners[0].emailAddress==user.email&&w[k].trashed==false&&w[k].ownedByMe==true&&w[k].owners[0].emailAddress==user.email) {
								window['wKey']=w[k].id;
								console.log(eSKey,eKey,uKey,wKey);
								tree.push(eSKey + ' ' + eKey + ' ' + uKey + ' ' + wKey);
								displayName.push(w[k].owners[0].displayName);
							}
						}
					}
				}
			}
		}
	}
	console.log(tree);
	//We have a problem if tree.length > 1
	if(tree.length===1) {
		updateUser('wardenFolderKey',wKey,'user');
		updateUser('usersFolderKey',uKey,'user');
		updateUser('emailFolderKey',eKey,'user');
		updateUser('emailSheetKey',eSKey,'user');
		updateUser('displayName',displayName[0],'user');
	}
	if(tree.length===0) {
		createNewAccount();
	}
}

accountFolders=[
'Warden CRM',
'Users',
user.email
];

function createNewAccount() {
	obj={name:'Warden CRM',mimeType: 'application/vnd.google-apps.folder',fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};
	createFolder(obj,'nextAccountFolder',0);
}

function createFolder(obj,respFunction,x) {
	gapi.client.drive.files.create(obj).then(function(response) {
		console.log(response);
		window[respFunction](response,x);
	}
}

function createSheet(obj,respFunction,x) {
	gapi.client.sheets.spreadsheets.create(obj).then(function(response) {
		console.log(response);
		window[respFunction](response,x);
	})
}

function nextAccountFolder(response,x) {
	console.log(response);
	x++;
	obj={};
	if(x>=accountFolders.length) {
		obj={properties: {title: user.email},fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};
		createSheet(obj,'moveFile',response.result.files[0].id);
	} else {
		obj={name:accountFolders[x],mimeType: 'application/vnd.google-apps.folder',parents[response.result.files[0].id],fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};
		createFolder(obj,'nextAccountFolder',x);
	}
}

function moveFile(response,x) {
	obj={addParents:[x],removeParents:[response.result.files[0].parents[0]],fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress,displayName),ownedByMe)'};
	gapi.client.drive.files.update(obj).then(function(response) {
		console.log(response);
		window[respFunction](response,x);
	}
}


function log(x,y) {
	console.log(x,y);
}










/*
function updateSheet(obj,respFunction,x) {
	gapi.client.sheets.spreadsheets.values.update(obj).then(function(response) {
		console.log(response);
		window[respFunction](response,x);
	})
}
*/

