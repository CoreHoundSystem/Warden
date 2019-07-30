function newAccount(email) {
	window['user']={'email':email};
	console.log(user);
	promiseObject={w:0,u:0,e:0,eS:0};
	obj={q: "name = 'Warden CRM' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','w');
	obj={q: "name = 'Users' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','u');
	obj={q: "name = '" + user.email + "' and (mimeType = 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
	getFileList(obj,'checkAccount','e');
	obj={q: "name = '" + user.email + "' and (mimeType != 'application/vnd.google-apps.folder')",fields:'files(id,trashed,parents,owners(me,permissionId,emailAddress),ownedByMe)'};	
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

function checkAccount(response,x) {
	window[x]=response.result.files;
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
	for(var h=0;h<eS.length;h++) {
		for(var i=0;i<e.length;i++) {
			if(eS[h].parents[0]==e[i].id) {
				window['eSKey']=eS[h].id;
				window['eKey']=e[i].id;
				console.log(eSKey,eKey);
				for(var j=0;j<u.length;j++) {
					if(e[i].parents[0]==u[j].id) {
						window['uKey']=u[j].id;
						console.log(eSKey,eKey,uKey);
						for(var k=0;k<w.length;k++) {
							if(u[j].parents[0]==w[k].id) {
								window['wKey']=w[k].id;
								console.log(eSKey,eKey,uKey,wKey);
								tree.push(eSKey,eKey,uKey,wKey);
							}
						}
					}
				}
			}
		}
	}
	console.log(tree);
}
